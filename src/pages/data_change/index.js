import React, { useState, useEffect, useMemo, useCallback } from "react";
import { message, Table, Modal } from "antd";
import axios from "@/plugins/axios";
import { dataJson } from "./data";

export default () => {
  useEffect(() => {
    getTableData();
  }, [getTableData]);

  return (
    <div>
      <div className="tableWrap">数组长度{dataJson.length}</div>
    </div>
  );
};
