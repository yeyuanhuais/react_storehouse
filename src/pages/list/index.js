import React, { useState, useEffect, useMemo, useCallback } from "react";
import { message, Table, Modal } from "antd";
import axios from "@/plugins/axios";

export default () => {
  const [tableData, setTableData] = useState([]); //设置表格数据
  const [tableLoading, setTableLoading] = useState(false); //表格加载状态
  const [pageInfo, setPage] = useState({ page_size: 10, page_no: 1 }); //分页
  const [total, setTotal] = useState(0); //页码总数
  const [selectedRowKeys, onSelectChange] = useState([]); //表格选择项

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const columns = [
    {
      title: "素材名称",
      dataIndex: "name",
      key: "name",
      width: 200,
      searchFilter: true,
    },
    {
      title: "素材类型",
      dataIndex: "type",
      key: "type",
      width: 120,
      filters: [
        {
          text: "图片",
          value: "2",
        },
        {
          text: "文字",
          value: "1",
        },
      ],
      filterMultiple: false,
      render(test, record) {
        return <div>{test === 2 ? "图片" : "文字"}</div>;
      },
    },
    {
      title: "素材大小",
      dataIndex: "size",
      key: "size",
      width: 120,
    },
    {
      title: "操作",
      width: 120,
      dataIndex: "operate",
      render: (text, record) => {
        return (
          <div className="table_btn">
            {record.type != 2 && (
              <a >
                编辑
              </a>
            )}
            <a >
              删除
            </a>
          </div>
        );
      },
    },
  ];

  /* ==========更改表格数据的信息时（翻页，筛选，排序） ========== */
  const changeTable = (pagination, filters, sorter, extra) => {
    if (extra.action === "filter") {
      //如果是筛选条件更新了
      setPage({ ...pageInfo, page_no: 1 }); //分页
    } else if (extra.action === "sort") {
      //如果是排序触发的
      setPage({ ...pageInfo, page_no: 1 }); //分页
    } else {
      //如果是翻页触发的
      setPage({ ...pageInfo, ...{ page_size: pagination.page_size, page_no: pagination.page_no } }); //分页
    }
  };


  /* ========= 获得表格数据 ========== */
  const getTableData = useCallback(() => {
    onSelectChange([]);
    setTableLoading(true);
    axios
      .post("/v1/productConfig/mater/query", {
        ...pageInfo,
      })
      .then((res) => {
        if (res.code === "000000") {
          setTableLoading(false);
          setTableData(res.data.list);
          setTotal(Number(res.data.total || 0));
        } else {
          message.error("获取素材失败");
        }
      });
  }, [pageInfo]);


  useEffect(() => {
    getTableData();
  }, [getTableData]);

  return (
    <div>
      <div className="tableWrap">
        <Table
          rowKey={(record) => record.id}
          rowSelection={rowSelection}
          dataSource={tableData}
          columns={columns}
          loading={tableLoading}
          pagination={{ ...pageInfo, total }}
          onChange={changeTable}
        />
      </div>
    </div>
  );
};
