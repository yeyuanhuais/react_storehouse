import React, { Suspense, useCallback, useEffect, useState } from "react";
import { ConfigProvider } from "antd";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import store from "./redux";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import zhCN from "antd/es/locale/zh_CN";
import PageLoad from "components/page_load";
import { OutRouter } from "@/router";
import moment from "moment";
import "moment/locale/zh-cn";
import "assets/style/style.less";
import Layout from "pages/layout/index";
moment.locale("zh-cn");

const App = () => {
  return (
    <ConfigProvider locale={zhCN}>
      <Provider store={store}>
        <Suspense fallback={<PageLoad />}>
          <BrowserRouter basename="/">
            <Routes>
              {OutRouter.map((item) => {
                return <Route element={<item.component />} path={item.path} key={item.key} />;
              })}
              {/* <Route
                path="/"
                render={({ location }) => {
                  let token = localStorage.getItem("token");
                  return token ? <Layout /> : <Navigate to="/login" />;
                }}
              /> */}
            </Routes>
            <Layout />
          </BrowserRouter>
        </Suspense>
      </Provider>
    </ConfigProvider>
  );
};
createRoot(document.getElementById("app")).render(<App />);
