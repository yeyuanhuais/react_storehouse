import React, { useState, createContext, useContext, useEffect } from "react";
import MyIcon from "components/my_icon";
import style from "../layout.less";
import { CollapsedContext } from "components/context_manager";
import { Dropdown, Menu, Space } from "antd";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
export default () => {
  const { collapsed, setCollapsed } = useContext(CollapsedContext);
  const userInfo = useSelector((state) => state.userInfo);
  const routerHistory = useHistory();

  //退出登录
  const handleGoOut = () => {
    localStorage.removeItem("token");
    routerHistory.push("/login");
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
    <div className={`${style.top_header_wrap} ${collapsed ? style.close_menu : ""}`}>
      <div className={style.top_header_content}>
        <div
          className={style.open_menu_btn}
          onClick={() => {
            setCollapsed((item) => !item);
          }}
        >
          {!collapsed ? <MyIcon type="icon-dingbushouqi" /> : <MyIcon type="icon-dingbuzhankai" />}
        </div>
        <div className={style.user_info}>
          <div className={style.user_img}>
            <img src="https://static.253.com/images/header_default.png" alt="头像" />
          </div>
          {userInfo.username && (
            <div className={style.user_text}>
              <Dropdown placement="bottomRight" overlay={menu}>
                <div>
                  <h3>{userInfo.customerName}</h3>
                  <p>{userInfo.username}</p>
                </div>
              </Dropdown>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
