import React, { useState, useContext, useMemo } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import { Menu, Drawer } from "antd";
import MyIcon from "components/my_icon";
import style from "../layout.less";
import { CollapsedContext } from "components/context_manager";

const { SubMenu } = Menu;
const MenuList = [
  { name: "首页", path: "/home", key: "100000", icon: "icon-shouye" },
  { name: "编辑器", path: "/editor", key: "200000", icon: "icon-fuwenbenbianjiqi" },
  {
    name: "子菜单",
    key: "102000",
    icon: "icon-shujutongji",
    children: [
      { name: "列表1", path: "/list", key: "102001" },
      { name: "列表2", path: "/list2", key: "102002" },
    ],
  },
];
export default () => {
  const { collapsed } = useContext(CollapsedContext);
  const routerLoaction = useLocation();
  const routerHistory = useHistory();
  const { defaultSelectedKeys, defaultOpenKeys } = useMemo(() => {
    let selectkey = [];
    let openkey = [];
    for (let i = 0; i < MenuList.length; i++) {
      let item = MenuList[i];
      if (routerLoaction.pathname.indexOf(item.path) === 0) {
        selectkey.push(item.key);
        break;
      }
      if (item.children && item.children.length > 0) {
        for (let y = 0; y < item.children.length; y++) {
          const child = item.children[y];
          if (routerLoaction.pathname.indexOf(child.path) === 0) {
            selectkey.push(child.key);
            openkey.push(item.key);
            break;
          }
        }
      }
    }
    return {
      defaultSelectedKeys: selectkey,
      defaultOpenKeys: openkey,
    };
  }, [MenuList, routerLoaction.pathname]);

  /* ========== 跳转 ========== */
  const goto = (path) => {
    routerHistory.push(path);
  };

  return (
    <div className={`${style.menu_wrap} ${collapsed ? style.close_menu : ""}`}>
      <div className={style.menu_content}>
        <div className={style.logo_wrap}>
          {!collapsed ? (
            <h1>
              <Link to="/home">
                <img src="https://static.253.com/images/logo_max.png" alt="logo" className={style.max_img} />
              </Link>
            </h1>
          ) : (
            <h1>
              <Link to="/home">
                <span>
                  <img src="https://static.253.com/images/logo_min.png" alt="logo" className={style.min_img} />
                </span>
              </Link>
            </h1>
          )}
        </div>
        <div className={style.nav_wrap}>
          <div className={style.scrollbar}>
            <div className={style.scroll_wrap}>
              <Menu
                selectedKeys={defaultSelectedKeys}
                defaultOpenKeys={defaultOpenKeys}
                mode="inline"
                theme="dark"
                inlineCollapsed={collapsed}
              >
                {MenuList.map((item) => {
                  if (!item.children || item.children == 0) {
                    return (
                      <Menu.Item key={item.key} icon={<MyIcon type={item.icon} />} onClick={() => goto(item.path)}>
                        {item.name}
                      </Menu.Item>
                    );
                  } else {
                    return (
                      <SubMenu key={item.key} icon={<MyIcon type={item.icon} />} title={item.name}>
                        {item.children.map((child) => {
                          return (
                            <Menu.Item key={child.key} onClick={() => goto(child.path)}>
                              {child.name}
                            </Menu.Item>
                          );
                        })}
                      </SubMenu>
                    );
                  }
                })}
              </Menu>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
