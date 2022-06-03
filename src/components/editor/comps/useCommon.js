import React, { useEffect, useMemo, useState, useCallback } from "react";
import { createEditor, Transforms, Node } from "slate";
import { DefaultElement, SpaceElement, UrlElement, VarElement, ElementType } from "./element";
import reg from "./reg";

export default () => {
  /* ========== 导出时恢复textarea编辑模式 ==========*/
  const serialize = (new_value) => {
    return new_value.map((n) => Node.string(n)).join("\n");
  };

  /* ========== 导入时转换成想要的格式 ==========*/
  const deserialize = (string) => {
    if (string === "") {
      return {
        type: "paragraph",
        children: [{ text: "" }],
      };
    }
    let paragraph = string.split("\n").map((line) => {
      // 先隔开超链接
      let urlArr = line
        .replace(reg.urlchange, (c) => {
          return `卍卍${c}卍卍`;
        })
        .replace(reg.variable, (c) => {
          return `卍卍${c}卍卍`;
        }).split("卍卍");
      let children = [];
      for (let i = 0; i < urlArr.length; i++) {
        if (urlArr[i] !== "") {
          if (reg.urlchange.test(urlArr[i])) {
            children.push(urlArr[i]);
          } else {
            let spaceHasArr = urlArr[i].split(" ");
            let spaceArr = [];
            for (let y = 0; y < spaceHasArr.length; y++) {
              if (spaceHasArr[y]) {
                spaceArr.push(spaceHasArr[y]);
              }
              if (y < spaceHasArr.length - 1) {
                spaceArr.push(" ");
              }
            }
            children = [...children, ...spaceArr];
          }
        }
      }
      let lastArr = [];
      children.forEach((item) => {
        reg.urlchange.lastIndex = 0;
        reg.variable.lastIndex = 0;
        if (item === " ") {
          lastArr.push(ElementType("space", ""), { text: "" });
        } else if (reg.variable.test(item)) {
          lastArr.push(ElementType("variable", item), { text: "" });
        } else if (reg.urlchange.test(item)) {
          lastArr.push(ElementType("shorturl", item.replace(/\s/gi, "")), { text: "" });
        } else {
          lastArr.push({ text: item });
        }
      });
      lastArr = lastArr.length === 0 ? [{ text: "" }] : lastArr;
      return {
        type: "paragraph",
        children: lastArr,
      };
    });
    return paragraph;
  };

  /* ========== 渲染不同类型元素 ==========*/
  const renderElement = useCallback((child_props) => {
    const { element } = child_props;
    switch (element.type) {
      case "space":
        return <SpaceElement {...child_props} />;
      case "shorturl":
        return <UrlElement {...child_props} />;
      case "variable":
        return <VarElement {...child_props} />;
      default:
        return <DefaultElement {...child_props} />;
    }
  }, []);

  return { deserialize, renderElement, serialize };
};
