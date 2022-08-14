import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import style from "./layout.less";
import Menu from "./comps/menu";
import TopHeader from "./comps/top_header";
import { CollapsedContext } from "components/context_manager";
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
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};
