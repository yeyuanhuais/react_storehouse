import React, { useCallback, useContext, useMemo, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Menu } from "antd";
import style from "../layout.less";
import { CollapsedContext } from "components/context_manager";
import Janni from "assets/images/janni.png";
import { InRouter } from "@/router";
import { findCurNode, findTreeSelect } from "@/plugins/utils";

export default () => {
  const { collapsed, setBreadName } = useContext(CollapsedContext);
  const routerLoaction = useLocation();
  const routerNavigate = useNavigate();

  const { defaultSelectedKeys, defaultOpenKeys } = useMemo(() => {
    let selectkey = [];
    let openkey = [];
    for (let i = 0; i < InRouter.length; i++) {
      let item = InRouter[i];
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
  }, [routerLoaction.pathname]);

  /* ========== 跳转 ========== */
  const goto = useCallback(
    (path) => {
      routerNavigate(path);
    },
    [routerNavigate]
  );
  useEffect(() => {
    setBreadName(findTreeSelect(InRouter, (data) => data.key == defaultSelectedKeys, ""));
  }, [defaultSelectedKeys, setBreadName]);
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
                <span><img src={Janni} alt="logo" className={style.min_img} /></span>
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
                items={InRouter}
                onClick={(item) => {
                  const itemMenu = findCurNode(InRouter, item.key, "key");
                  setBreadName(findTreeSelect(InRouter, (data) => data.key == item.key, ""));
                  goto(itemMenu.path);
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
