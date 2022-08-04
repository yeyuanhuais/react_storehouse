import React, { useState, useMemo, useCallback, useEffect } from "react";
import { Button, Input, Table, Space, Checkbox, Empty } from "antd";
import { CheckOutlined } from "@ant-design/icons";
import MyIcon from "@/components/my_icon";
import axios from "@/plugins/axios";

/* ==================================================
 * 远程搜索下拉元素
 * ================================================== */

const RemoveEle = ({ headItem, setSelectedKeys, selectedKeys = [], confirm, clearFilters }) => {
  const [list, setList] = useState([]);
  const [fetching, setFetching] = useState(false); //请求接口
  const [data, setData] = useState(""); //input框值
  const resetList = useMemo(() => {
    //格式化数组
    return list.map((item) => {
      let obj = {};
      obj.id = item[headItem.remoteParams.id];
      obj.label = item[headItem.remoteParams.label];
      return obj;
    });
  }, [list, headItem.remoteParams]);

  /* ============== 远程获得数据 ============== */
  const getRemoveData = useCallback(
    (keyword) => {
      let params = {};
      setFetching(true);
      params[headItem.remoteParams.key] = keyword;
      axios.post(headItem.remoteParams.url || "", params).then((res) => {
        setFetching(false);
        if (res.code === "000000") {
          setList(res.data.list || res.data);
        }
      });
    },
    [headItem.remoteParams.key, headItem.remoteParams.url]
  );

  useEffect(() => {
    getRemoveData("");
  }, [getRemoveData]);

  return (
    <div style={{ padding: 10 }}>
      <Space>
        <Input
          placeholder={`请输入${headItem.title}关键词`}
          style={{ width: 150 }}
          size="small"
          value={data}
          onPressEnter={() => getRemoveData(data)}
          onChange={(e) => {
            setData(e.target.value);
          }}
        />
        <Button type="primary" size="small" onClick={() => getRemoveData(data)} disabled={fetching}>
          搜索
        </Button>
      </Space>
      <div className="table_remote_list">
        {resetList.length === 0 && <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />}
        {resetList.length > 0 && (
          <ul>
            {resetList.map((item) => (
              <li
                key={item.id}
                className={selectedKeys[0] && selectedKeys[0].id === item.id ? "selected" : ""}
                onClick={() => {
                  setSelectedKeys([item]);
                  setData("");
                  confirm();
                }}
              >
                <div>{item.label}</div>
                {selectedKeys[0] && selectedKeys[0].id === item.id && (
                  <div className="arrow">
                    <CheckOutlined />
                  </div>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default (props) => {
  const [tb_filters, setTbFilters] = useState({}); //定义原始筛选项
  const [tb_page, setTbPage] = useState({}); // 翻页数据
  const [tb_sorter, setTbSorter] = useState({}); // 排序数据
  const [originalColums, selectColums] = useState([]); //初始选中的值
  //全部列头
  const headColumns = useMemo(() => {
    let columns = props.columns.map((item) => item.dataIndex || item.key);
    return columns;
  }, [props.columns]);

  //存放表头localstore的键值名称
  const setTableKey = useMemo(() => props.name || null, [props.name]);

  useEffect(() => {
    let defaultTableHeader = headColumns; //先默认表头是全部值
    let hasSetHeader = props.columns.some((item) => item.setHeader); //判断是否有设置表头的属性
    if (setTableKey && localStorage.getItem(setTableKey) && hasSetHeader) {
      //如果有表头名称，就查看是否设置过localStorage
      defaultTableHeader = JSON.parse(localStorage.getItem(setTableKey));
    }
    selectColums(defaultTableHeader);
  }, [props.columns, headColumns, setTableKey]);

  /* 获得筛选表头的元素 */
  /* ================================================== */
  const headCheckbox = useCallback(() => {
    const headArr = [...props.columns];
    return (
      <Checkbox.Group defaultValue={originalColums} onChange={selectColums}>
        <ul className="setTableWrap">
          {headArr.map((ite) => (
            <li key={ite.dataIndex || ite.key}>
              <Checkbox value={ite.dataIndex || ite.key} disabled={ite.setHeader}>
                {ite.title}
              </Checkbox>
            </li>
          ))}
        </ul>
      </Checkbox.Group>
    );
  }, [originalColums, props.columns]);

  /* 点击设置表头确定事件 */
  /* ================================================== */
  const setTableHeader = useCallback(
    (confirm) => {
      if (setTableKey) {
        //如果有表格设置的键值name属性就存储localstore
        localStorage.setItem(setTableKey, JSON.stringify(originalColums));
      }
      confirm();
    },
    [originalColums, setTableKey]
  );

  /* 变化的表格属性 */
  /* ================================================== */
  const tableProps = useMemo(() => {
    let resultProps = { ...props };
    resultProps.columns = resultProps.columns ? resultProps.columns : [];
    //先筛选出表头
    resultProps.columns = resultProps.columns.filter((item) => {
      return originalColums.indexOf(item.dataIndex || item.key) >= 0;
    });
    resultProps.columns = resultProps.columns.map((item) => {
      // 设置内容远程搜索
      if (item.searchRemote && item.remoteParams) {
        item.filterDropdown = (pro) => <RemoveEle {...pro} headItem={item} />;
        item.filterIcon = (filtered) => (
          <MyIcon type="bsousou" style={{ color: filtered ? "#3a72ff" : "", fontSize: 14 }} />
        );
        item.filteredValue = tb_filters[item.dataIndex || item.key] || null;
      }

      //设置搜索属性
      if (item.searchFilter) {
        item.filterDropdown = ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
          <div style={{ padding: 10 }}>
            <Input
              placeholder={`请输入${item.title}关键词`}
              value={selectedKeys[0]}
              onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
              onPressEnter={confirm}
              style={{ width: 240, marginBottom: 8, display: "block" }}
            />
            <Space>
              <Button type="primary" onClick={confirm} size="small">
                搜索
              </Button>
              <Button onClick={clearFilters} size="small" type="text">
                取消
              </Button>
            </Space>
          </div>
        );
        item.filterIcon = (filtered) => (
          <MyIcon type="bsousou" style={{ color: filtered ? "#3a72ff" : "", fontSize: 14 }} />
        );
        item.filteredValue = tb_filters[item.dataIndex || item.key] || null;
      }
      //设置操作表头
      if (item.setHeader) {
        item.filterDropdown = ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
          <div className="settableheader">
            <h4>自定义表头</h4>
            {headCheckbox()}
            {/* <div className="setTablebtn">
              <Button onClick={clearFilters} size="small">
                取消
              </Button>
              <Button
                type="primary"
                onClick={() => {
                  setTableHeader(confirm);
                }}
                size="small"
                style={{ marginLeft: 10 }}
              >
                确定
              </Button>
            </div> */}
          </div>
        );
        item.filterIcon = () => <MyIcon type="biaotoushezhi" style={{ color: "#666A77", fontSize: 14 }} />;
      }
      //如果有筛选，添加受控属性
      if (item.filters) {
        item.filteredValue = tb_filters[item.dataIndex || item.key] || null;
      }
      return item;
    });
    return resultProps;
  }, [props, originalColums, headCheckbox, tb_filters]);

  /* 改变表格筛选数据，翻页等数据时 */
  /* ================================================== */

  const onChangeTable = (pagination, filters, sorter, extra) => {
    setTbFilters(filters);
    setTbPage({
      page_size: pagination.pageSize,
      page_no: pagination.current,
    });
    setTbSorter(sorter);
    props.onChange(
      {
        page_size: pagination.pageSize,
        page_no: pagination.current,
      },
      filters,
      sorter,
      extra
    );
  };

  /* 计算筛选项的结果 */
  /* ================================================== */
  const filterArr = useMemo(() => {
    const headArr = [...props.columns];
    let arr = [];
    for (let key in tb_filters) {
      if (tb_filters[key]) {
        let currentcolumns = headArr.filter((item) => item.dataIndex === key || item.key === key)[0];
        if (currentcolumns.filters) {
          //如果是多选或者单选
          let values = tb_filters[key].map((val) => {
            let ppval = null;
            for (let i = 0; i < currentcolumns.filters.length; i++) {
              if (val == currentcolumns.filters[i].value) {
                ppval = currentcolumns.filters[i];
                break;
              }
            }
            return ppval;
          });
          arr.push({
            title_name: currentcolumns.title_name || null,
            title: currentcolumns.title,
            key: currentcolumns.dataIndex || currentcolumns.key,
            values: values.map((item) => item.text).join(","),
          });
        }
        if (currentcolumns.searchFilter) {
          arr.push({
            title_name: currentcolumns.title_name || null,
            title: currentcolumns.title,
            key: currentcolumns.dataIndex || currentcolumns.key,
            values: tb_filters[key].join(","),
          });
        }
        if (currentcolumns.searchRemote) {
          arr.push({
            title: currentcolumns.title,
            key: currentcolumns.dataIndex || currentcolumns.key,
            values: tb_filters[key][0].label,
          });
        }
      }
    }
    return arr;
  }, [tb_filters, props.columns]);

  /* 清空所有筛选 */
  const clearAllFilters = () => {
    setTbFilters({});
    props.onChange(tb_page, {}, tb_sorter, { action: "filter" });
  };

  /* 清除单个删选 */
  const clearFilterSelf = (key) => {
    let fil = { ...tb_filters };
    fil[key] = null;
    setTbFilters(fil);
    props.onChange(tb_page, fil, tb_sorter, { action: "filter" });
  };

  return (
    <div className="tableWrap">
      {filterArr.length > 0 && (
        <div className="tableilter_wrap">
          <ul>
            {filterArr.map((item) => {
              return (
                <li key={item.key}>
                  <span>
                    {item.title_name || item.title}:{item.values}
                  </span>
                  <span
                    className="closebtn"
                    onClick={() => {
                      clearFilterSelf(item.key);
                    }}
                  >
                    <MyIcon type="cha" />
                  </span>
                </li>
              );
            })}
            <li className="clearAllbtn" onClick={clearAllFilters}>
              清空
            </li>
          </ul>
        </div>
      )}
      <Table
        {...tableProps}
        className={`modal_style ${tableProps.className ? tableProps.className : ""}`}
        pagination={
          tableProps.pagination && {
            current: tableProps.pagination && tableProps.pagination.page_no ? tableProps.pagination.page_no : 1,
            pageSize: tableProps.pagination && tableProps.pagination.page_size ? tableProps.pagination.page_size : 10,
            total: tableProps.pagination && tableProps.pagination.total ? tableProps.pagination.total : 0,
            showQuickJumper: true,
            showSizeChanger: true,
            showTotal(total, range) {
              return `共 ${total} 条数据`;
            },
            showTitle: true,
          }
        }
        onChange={onChangeTable}
      />
    </div>
  );
};
