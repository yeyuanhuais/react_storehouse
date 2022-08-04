import React, { useState, Suspense } from "react";
import { Route, Navigate, Routes } from "react-router-dom";
import style from "./layout.less";
import { InRouter } from "@/router";
import Menu from "./comps/menu";
import TopHeader from "./comps/top_header";
import { CollapsedContext } from "components/context_manager";
import MyNprogress from "components/my_nprogress";
import { treeToArray } from "@/plugins/utils";
import { Breadcrumb } from "antd";
export default () => {
  const [collapsed, setCollapsed] = useState(false);
  const [breadName, setBreadName] = useState(false);

  return (
    <div className={`${style.layout_wrap}`}>
      <div className={style.content_wrap}>
        <CollapsedContext.Provider value={{ collapsed, setCollapsed, breadName, setBreadName }}>
          <Menu />
          <TopHeader />
        </CollapsedContext.Provider>
        <div className={`${style.child_wrap} ${collapsed ? style.close_menu : ""}`}>
          <div className={`${style.top_header_breadcrumb} ${collapsed ? style.close_menu : ""}`}>
            <Breadcrumb className={style.breadcrumb}>
              {(breadName || []).map((item) => (
                <Breadcrumb.Item key={item.key}>
                  {item.icon}
                  <span className={style.label}>{item.label}</span>
                </Breadcrumb.Item>
              ))}
            </Breadcrumb>
          </div>
          <div className={style.child_content}>
            <Suspense fallback={<MyNprogress />}>
              <Routes>
                {treeToArray(InRouter).map((item) => {
                  return item.path && <Route path={item.path} element={<item.component />} key={item.key} />;
                })}
                <Route path="/" element={<Navigate to="/home" />} />
              </Routes>
            </Suspense>
          </div>
        </div>
      </div>
      <a style={{ color: "#FFF" }} href="https://beian.miit.gov.cn/" target="_blank" rel="noreferrer">
        闽ICP备2021014833号-1
      </a>
    </div>
  );
};
