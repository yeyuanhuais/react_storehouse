import React, { useCallback, useContext, useMemo } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Menu, Drawer } from "antd";
import MyIcon from "components/my_icon";
import style from "../layout.less";
import { CollapsedContext } from "components/context_manager";
import Janni from "assets/images/janni.png";

export default () => {
  const { collapsed } = useContext(CollapsedContext);
  const routerLoaction = useLocation();
  const routerNavigate = useNavigate();
  /* ========== 跳转 ========== */
  const goto = useCallback(
    (path) => {
      routerNavigate(path);
    },
    [routerNavigate]
  );

  const MenuList = useMemo(
    () => [
      {
        label: "首页",
        path: "/home",
        key: "100000",
        icon: <MyIcon type="icon-home" />,
        onClick: () => goto("/home"),
      },
      {
        label: "编辑器",
        path: "/editor",
        key: "200000",
        icon: <MyIcon type="icon-fuwenbenbianjiqi" />,
        onClick: () => goto("/editor"),
      },
      {
        label: "视频播放器",
        path: "/video",
        key: "300000",
        icon: <MyIcon type="icon-video" />,
        onClick: () => goto("/video"),
      },
      {
        label: "子菜单",
        key: "102000",
        icon: <MyIcon type="icon-shujutongji" />,
        children: [
          { label: "列表1", path: "/list", key: "102001" },
          { label: "列表2", path: "/list2", key: "102002" },
        ],
      },
    ],
    [goto]
  );
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

  return (
    <div className={`${style.menu_wrap} ${collapsed ? style.close_menu : ""}`}>
      <div className={style.menu_content}>
        <div className={style.logo_wrap}>
          {!collapsed ? (
            <h1>
              <Link to="/home">
                <img src={Janni} alt="logo" className={style.max_img} />
              </Link>
            </h1>
          ) : (
            <h1>
              <Link to="/home">
                <span>{/* <img src="" alt="logo" className={style.min_img} /> */}</span>
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
                items={MenuList}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
