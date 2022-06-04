import React, { useEffect, useMemo } from "react";
import style from "../style.less";
import smsNumb from "./smsNumb";
import { useSelector } from "react-redux";
export default ({ smscontent, onChangeShow = () => {} }) => {
  const countHtml = useMemo(() => {
    return smsNumb(smscontent);
  }, [smscontent]);
  useEffect(() => {
    onChangeShow(countHtml || {});
  }, [countHtml, onChangeShow]);
  return (
    <div className={style.textnumber}>
      <div className={style.number} dangerouslySetInnerHTML={{ __html: countHtml.html }}></div>
    </div>
  );
};
