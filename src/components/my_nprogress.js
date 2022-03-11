import React, { useEffect } from "react";
import NProgress from "nprogress";
import "assets/style/nprogress.css";
export default () => {
  useEffect(() => {
    NProgress.start();
    return () => {
      NProgress.done();
    };
  }, []);
  return <></>;
};
