import React, { Suspense, useCallback, useEffect, useState } from "react";
import { ConfigProvider } from "antd";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import store from "./redux";
import { BrowserRouter, Routes, Route, Navigate, Outlet } from "react-router-dom";
import zhCN from "antd/es/locale/zh_CN";
import PageLoad from "components/page_load";
import { OutRouter, InRouter } from "@/router";
import moment from "moment";
import "moment/locale/zh-cn";
import "assets/style/style.less";
import Layout from "pages/layout";
import MyNprogress from "components/my_nprogress";
import { treeToArray } from "@/plugins/utils";
moment.locale("zh-cn");

const App = () => {
  /* ========== 懒加载组件控制 ========== */
  const SuspenseComps = (Comps) => {
    return (
      <Suspense fallback={<MyNprogress />}>
        <Comps />
      </Suspense>
    );
  };
  return (
    <ConfigProvider locale={zhCN}>
      <Provider store={store}>
        <Suspense fallback={<PageLoad />}>
          <BrowserRouter basename="/">
            <Routes>
              <Route path="/" element={<Outlet />}>
                {OutRouter.map((item) => {
                  return <Route element={<item.component />} path={item.path} key={item.key} />;
                })}
              </Route>
              <Route path="/" element={<Layout />}>
                {treeToArray(InRouter).map((item) => {
                  return item.path && <Route path={item.path} element={SuspenseComps(item.component)} key={item.key} />;
                })}
              </Route>
              <Route index element={<Navigate replace to="/home" />} />
            </Routes>
          </BrowserRouter>
        </Suspense>
      </Provider>
    </ConfigProvider>
  );
};
createRoot(document.getElementById("app")).render(<App />);
