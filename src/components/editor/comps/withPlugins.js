import { Transforms } from "slate";
import { ElementType } from "./element";
import reg from "./reg";
export default (editor) => {
  const { isInline, isVoid, insertText } = editor;
  /* ========== 更改行内特性 ========== */
  editor.isInline = (element) => {
    return element.type === "space" ||
      element.type === "shorturl" ||
      element.type === "variable"
      ? true
      : isInline(element);
  };

  /* ========== 更改不可编辑特性 ========== */
  editor.isVoid = (element) => {
    return element.type === "space" ||
      element.type === "shorturl" ||
      element.type === "variable"
      ? true
      : isVoid(element);
  };

  /* ========== 更改插入特性 ========== */
  editor.insertText = (text) => {
    if (text !== "") {
      let urlArr = text
        .replace(reg.urlchange, (c) => {
          return `卍卍${c}卍卍`;
        })
        .replace(reg.variable, (c) => {
          return `卍卍${c}卍卍`;
        })
        .split("卍卍");
      urlArr.forEach((item) => {
        reg.urlchange.lastIndex = 0;
        reg.variable.lastIndex = 0;
        if (item) {
          if (reg.urlchange.test(item)) {
            //如果匹配到网址
            Transforms.insertNodes(editor, ElementType("shorturl", item.replace(" ", "")));
            Transforms.move(editor, { distance: 1, unit: "line" });
            Transforms.insertText(editor, "");
          } else if (reg.variable.test(item)) {
            //如果匹配到变量
            Transforms.insertNodes(editor, ElementType("variable", item));
            Transforms.move(editor, { distance: 1, unit: "line" });
            Transforms.insertText(editor, "");
          } else {
            const textArr = Array.from(item);
            textArr.forEach((child) => {
              if (child === " ") {
                Transforms.insertNodes(editor, ElementType("space"));
                Transforms.move(editor, { distance: 1, unit: "line" });
              } else {
                insertText(child);
              }
            });
          }
        }
      });
    } else {
      insertText(text);
    }
  };
  return editor;
};
