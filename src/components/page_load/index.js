import React from "react";
import styles from "./index.module.less";
import loadingImg from "@/assets/images/loading.svg";
export default () => {
  return (
    <div className={styles.pageLoad}>
      <img src={loadingImg} alt="" />
    </div>
  );
};
