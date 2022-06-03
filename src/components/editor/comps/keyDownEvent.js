import {
  createEditor,
  Range,
  Editor,
  Text,
  Transforms,
  Node,
  Element as SlateElement,
  Path,
  Location,
  Point,
} from "slate";
import { Slate, Editable, withReact, useSelected, useFocused, ReactEditor } from "slate-react";
import reg from "./reg";
import { ElementType } from "./element";

/* ========== 获得前一个元素的内容 ========== */
const getbeforetxt = (editor, current) => {
  const wordBefore = current && Editor.before(editor, current, { unit: "line" });
  const beforeRange = wordBefore && Editor.range(editor, wordBefore, current);
  const beforeText = beforeRange && Editor.string(editor, beforeRange);
  return { beforeText, beforePoint: wordBefore };
};

const getaftertxt = (editor, current) => {
  const after = current && Editor.after(editor, current, { unit: "line" });
  const afterRange = after && Editor.range(editor, current, after);
  const afterText = afterRange && Editor.string(editor, afterRange);
  return { afterText, afterPoint: after };
};

/* ========== 连续获取前2个元素的内容和后2个元素的内容 ========== */
const getAllBeforeTxt = (editor, current) => {
  const { beforeText, beforePoint } = getbeforetxt(editor, current);
  const { beforeText: nextbeforeText, beforePoint: beforeStart } = getbeforetxt(editor, beforePoint);
  const { afterText, afterPoint } = getaftertxt(editor, current);
  const { afterText: nextafterText, afterPoint: afterEnd } = getaftertxt(editor, afterPoint);
  return {
    beforeStart,
    afterEnd,
    nextbeforeText,
    beforeText,
    afterText,
    nextafterText,
  };
};

export default (e, editor) => {
  // 判断是否是变量{s}
  if (e.shiftKey && e.keyCode === 219) {
    //检查后面元素是s}
    const { selection } = editor;
    const [start] = Range.edges(selection);
    const { afterText } = getAllBeforeTxt(editor, start);
    if (reg.after_variable.test(afterText)) {
      let [result] = afterText.match(reg.after_variable);
      e.preventDefault();
      Transforms.select(editor, Editor.range(editor, start, { ...start, offset: start.offset + result.length }));
      Transforms.insertNodes(editor, ElementType("variable", `{${result}`));
      Transforms.setPoint(editor, start, { edge: "end" });
      Transforms.collapse(editor, { edge: "end" });
    }
  }

  if (e.shiftKey && e.keyCode === 221) {
    //检查前面的元素是{s
    const { selection } = editor;
    const [start] = Range.edges(selection);
    const { beforeText } = getAllBeforeTxt(editor, start);
    if (reg.before_variable.test(beforeText)) {
      let [result] = beforeText.match(reg.before_variable);
      e.preventDefault();
      Transforms.select(editor, Editor.range(editor, start, { ...start, offset: start.offset - result.length }));
      Transforms.insertNodes(editor, ElementType("variable", `${result}}`));
      Transforms.setPoint(editor, start, { edge: "end" });
      Transforms.collapse(editor, { edge: "end" });
    }
  }

  //监听空格批判前后是否是链接
  if (e.keyCode === 32) {
    const { selection } = editor;
    const [start] = Range.edges(selection);
    const { beforeStart, afterEnd, nextbeforeText, beforeText, afterText, nextafterText } = getAllBeforeTxt(
      editor,
      start
    );

    if (reg.url.test(beforeText) && nextbeforeText === "" && !!beforeStart) {
      //检查前面的元素是空格+url
      e.preventDefault();
      Transforms.select(editor, Editor.range(editor, beforeStart, start));
      Transforms.insertNodes(editor, ElementType("shorturl", beforeText));
      Transforms.setPoint(editor, beforeStart, { edge: "end" });
      Transforms.collapse(editor, { edge: "end" });
    } else if (reg.url.test(afterText) && nextafterText === "" && beforeText) {
      //检查后面的的元素是url+空格
      e.preventDefault();
      Transforms.select(editor, Editor.range(editor, Editor.before(editor, start), afterEnd));
      Transforms.move(editor);
      Transforms.insertNodes(editor, ElementType("shorturl", afterText));
      Transforms.move(editor, { distance: 1, unit: "line" });
    }
  }
};
