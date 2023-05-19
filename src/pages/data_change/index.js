import React, { useState, useEffect, useMemo, useCallback } from "react";
import { message, Table, Modal } from "antd";
import axios from "axios";
import { dataJson } from "./data";

export default () => {
  const [oldData, setOldData] = useState([]);
  useEffect(() => {
    let arr = dataJson.map((item, index) => {
      return { code: item.code, name: item.name };
    });
    setOldData(arr);
  }, []);
  const clickFcn = () => {
    console.log("oldData", oldData);
    oldData.forEach(async (item, index) => {
      if (item?.code && index < 3) {
        console.log("index", index);
        let res = await axios.get(
          `https://www.114yygh.com/web/hospital/detail?_time=${new Date().getTime()}&hosCode=${item.code}`
        );
        console.log("res", res);
      }
    });
  };
  return (
    <div>
      <div className="tableWrap">数组长度{dataJson.length}</div>
      <button onClick={clickFcn}>点击</button>
    </div>
  );
};
