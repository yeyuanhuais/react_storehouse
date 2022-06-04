import React, { useState } from "react";
import { Modal } from "antd";
import MyTable from "../../my_table";
import { html2Escape } from "plugins/utils";
export default ({ cancelFn }) => {
  const [tableData, setTableData] = useState([
    {
      id: 4,
      content:
        "Your registration verification code: {s}. If you don't operate by yourself, please ignore this message!",
    },
  ]); //设置表格数据
  const [tableLoading, setTableLoading] = useState(false); //表格加载状态
  const [pageInfo, setPage] = useState({ pageSize: 10, pageNo: 1 }); //分页

  const columns = [
    {
      title: "模板内容",
      dataIndex: "content",
      render: (text) => {
        let content = text;
        return <div className="content_wrap_break" dangerouslySetInnerHTML={{ __html: html2Escape(content) }} />;
      },
    },
    {
      title: "操作",
      width: 100,
      fixed: "right",
      dataIndex: "operate",
      render: (text, record) => {
        return (
          <div className="table_btn">
            <a onClick={() => cancelFn(record)}>选择</a>
          </div>
        );
      },
    },
  ];

  /* ==========更改表格数据的信息时（翻页，筛选，排序） ========== */
  const changeTable = (pagination, filters, sorter, extra) => {
    if (extra.action === "filter") {
      //如果是筛选条件更新了
      setPage({ ...pageInfo, pageNo: 1 }); //分页
    } else if (extra.action === "sort") {
      //如果是排序触发的
      setPage({ ...pageInfo, pageNo: 1 }); //分页
    } else {
      //如果是翻页触发的
      setPage({
        ...pageInfo,
        ...{ pageSize: pagination.page_size, pageNo: pagination.page_no },
      }); //分页
    }
  };

  return (
    <Modal width={900} visible title="选择模板" onCancel={() => cancelFn(false)} footer={null}>
      <div className="tableWrap">
        <MyTable
          rowKey={(record) => record.id}
          dataSource={tableData}
          columns={columns}
          loading={tableLoading}
          pagination={false}
          onChange={changeTable}
          scroll={{ y: 300 }}
        />
      </div>
    </Modal>
  );
};
