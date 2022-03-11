import React, { Suspense, useCallback, useEffect, useState } from "react";
import { ConfigProvider } from "antd";
import { render } from "react-dom";
import { Provider } from "react-redux";
import store from "./redux";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
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
            <Switch>
              {OutRouter.map((item) => {
                return <Route component={item.component} path={item.path} key={item.key} exact={item.exact || false} />;
              })}
              <Layout />
              {/* <Route
                path="/"
                render={({ location }) => {
                  let token = localStorage.getItem("token");
                  return token ? <Layout /> : <Redirect to="/login" />;
                }}
              /> */}
            </Switch>
          </BrowserRouter>
        </Suspense>
      </Provider>
    </ConfigProvider>
  );
};

render(<App />, document.getElementById("app"));
