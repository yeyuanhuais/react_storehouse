import React, { useEffect, useState } from "react";
import PageLoad from "components/page_load";
import Layout from "./layout";

export default () => {
  const [pageLoading, setPageLoading] = useState(true);
  /* ========== 拦截获得基本信息 ========== */
  useEffect(() => {
    setPageLoading(false);
  }, []);

  return pageLoading ? <PageLoad /> : <Layout />;
};
