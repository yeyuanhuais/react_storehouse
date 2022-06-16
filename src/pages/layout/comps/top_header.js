import React, { useState, createContext, useContext, useEffect } from "react";
import MyIcon from "components/my_icon";
import style from "../layout.less";
import { CollapsedContext } from "components/context_manager";
import { Dropdown, Menu, Space, Breadcrumb } from "antd";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Header_default from "assets/images/header_default.png";
export default () => {
  const { collapsed, setCollapsed, breadName } = useContext(CollapsedContext);
  console.log("%c breadName", "font-size:13px; background:pink; color:#bf2c9f;", breadName);
  const userInfo = useSelector((state) => state.userInfo);
  const routerNavigate = useNavigate();

  //退出登录
  const handleGoOut = () => {
    localStorage.removeItem("token");
    routerNavigate("/login");
  };

  const menu = (
    <Menu style={{ marginTop: "6px" }}>
      <Menu.Item>
        <div onClick={handleGoOut}>
          <Space>
            <MyIcon type="icon-tuichu" />
            退出登录
          </Space>
        </div>
      </Menu.Item>
    </Menu>
  );
  return (
    <>
      <div className={`${style.top_header_wrap} ${collapsed ? style.close_menu : ""}`}>
        <div className={style.top_header_content}>
          <div
            className={style.open_menu_btn}
            onClick={() => {
              setCollapsed((item) => !item);
            }}
          >
            {!collapsed ? <MyIcon type="icon-shousuo" /> : <MyIcon type="icon-open" />}
          </div>
          <div className={style.user_info}>
            <div className={style.user_img}>
              <img src={Header_default} alt="头像" />
            </div>
            {(userInfo.username || "默认") && (
              <div className={style.user_text}>
                <Dropdown placement="bottomRight" overlay={menu}>
                  <div>
                    <h3>{userInfo.customerName || "主账号"}</h3>
                    <p>{userInfo.username || "默认"}</p>
                  </div>
                </Dropdown>
              </div>
            )}
          </div>
        </div>
      </div>
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
    </>
  );
};
