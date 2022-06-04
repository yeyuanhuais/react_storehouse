import React, { useState, Suspense } from "react";
import { Route, Navigate, Routes } from "react-router-dom";
import style from "./layout.less";
import { InRouter } from "@/router";
import Menu from "./comps/menu";
import TopHeader from "./comps/top_header";
import { CollapsedContext } from "components/context_manager";
import MyNprogress from "components/my_nprogress";
export default () => {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <div className={`${style.layout_wrap}`}>
      <div className={style.content_wrap}>
        <CollapsedContext.Provider value={{ collapsed, setCollapsed }}>
          <Menu />
          <TopHeader />
        </CollapsedContext.Provider>
        <div className={`${style.child_wrap} ${collapsed ? style.close_menu : ""}`}>
          <div className={style.child_content}>
            <Suspense fallback={<MyNprogress />}>
              <Routes>
                {InRouter.map((item) => {
                  return <Route element={<item.component />} path={item.path} key={item.key} />;
                })}
                <Route path="/" element={<Navigate to="/home" />} />
              </Routes>
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
};
