import React from "react";
import { useSelected, useFocused } from "slate-react";
import style from "../style.less";
/* ========== 默认类型初始化 ========== */
export const ElementType = (type, text) => {
  switch (type) {
    case "space":
      return { type: "space", children: [{ text: " " }] };
    case "shorturl":
      text = text.replace(/\s/g, "");
      return { type: "shorturl", url: `${text}`, children: [{ text: ` ${text} ` }] };
    case "variable":
      return { type: "variable", variable: text, children: [{ text }] };
    default:
      return {
        type: "paragraph",
        children: [{ text: text || "" }],
      };
  }
};

/* ========== 默认元素 ========== */
export const DefaultElement = ({ attributes, children, element }) => {
  let str = "";
  element.children.forEach((child) => {
    if (child.type === "space") {
      str += " ";
    } else if (child.type === "shorturl") {
      str += ` ${child.url} `;
    } else if (child.type === "variable") {
      str += child.variable;
    } else {
      str += child.text;
    }
  });
  if (element.type === "paragraph" && str === "") {
    return <p className={style.empty_line}>{children}</p>;
  } else {
    return <p {...attributes}>{children}</p>;
  }
};

/* ========== 空格 ========== */
export const SpaceElement = ({ attributes, children }) => {
  const selected = useSelected();
  const focused = useFocused();
  return (
    <span {...attributes}>
      <span className={`${style.space} ${selected && focused ? style.selected : ""}`}></span>
      {children}
    </span>
  );
};

/* ========== url链接 ========== */
export const UrlElement = ({ attributes, children, element }) => {
  const selected = useSelected();
  const focused = useFocused();
  return (
    <span {...attributes} className={`${style.shorturl} ${selected && focused ? style.selected : ""}`}>
      <span className={style.space}></span>
      {element.url}
      <span className={style.space}></span>
      {children}
    </span>
  );
};

/* ========== 变量 ========== */
export const VarElement = ({ attributes, children, element }) => {
  const selected = useSelected();
  const focused = useFocused();
  return (
    <span
      {...attributes}
      className={`${style.varele} ${selected && focused ? style.selected : ""}`}
      style={/\{short_chain\}/gi.test(element.variable) ? { backgroundColor: "#0000ff", color: "#fff" } : null}
    >
      {element.variable}
      {children}
    </span>
  );
};
