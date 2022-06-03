import React, { useMemo, useState, forwardRef, useImperativeHandle } from "react";
import { Transforms, createEditor, Editor } from "slate";
import { Slate, Editable, withReact } from "slate-react";
import { withHistory } from "slate-history";
import withPlugins from "./comps/withPlugins";
import { ElementType } from "./comps/element";
import keyDownEvent from "./comps/keyDownEvent";
import useCommon from "./comps/useCommon";

import style from "./style.less";
// 设置初始偏移量
const initTarget = { offset: 0, path: [0, 0] };
// 延迟告诉父级变化，加快编辑器渲染
let changeIndex = null;

export default forwardRef(({ readOnly, onChange, onBlur, onFocus, productType }, ref) => {
  const editor = useMemo(() => withPlugins(withHistory(withReact(createEditor()))), []);
  const [value, setValue] = useState([ElementType()]);
  const [target, setTarget] = useState({ ...initTarget }); //记录标签位置
  const { deserialize, renderElement, serialize } = useCommon();

  /* ========== 提供父级调用 ==========*/
  useImperativeHandle(ref, () => ({
    /* 设置默认值|插入模板 */
    resetContent(text) {
      const end = Editor.end(editor, [value.length - 1]);
      const range = { anchor: initTarget, focus: end };
      Transforms.select(editor, range);
      Transforms.delete(editor);
      editor.insertText(text);
    },

    /* 插入URL链接 */
    insertUrl(url) {
      Transforms.select(editor, target);
      Transforms.insertNodes(editor, ElementType("shorturl", url));
      Transforms.move(editor, { distance: 1, unit: "line" });
      editor.selection && setTarget(editor.selection.anchor);
    },

    /* 插入emo表情|特殊符号|文本 */
    insertTextContent(_value) {
      Transforms.select(editor, target);
      Transforms.insertText(editor, _value);
      setTarget({ ...target, offset: target.offset + _value.length });
    },


    /* 插入变量 */
    insertVariable(_value) {
      Transforms.select(editor, target);
      Transforms.insertNodes(editor, ElementType("variable", _value));
      Transforms.move(editor, { distance: 1, unit: "line" });
      editor.selection && setTarget(editor.selection.anchor);
    },

    /* 回退，前进 */
    reundo(type) {
      setTarget(initTarget);
      if (type === "redo") {
        editor.redo();
      } else {
        editor.undo();
      }
    },
  }));

  /* ========== 改变内容 ==========*/
  const changeContent = (newValue) => {
    setValue(newValue);
    clearTimeout(changeIndex);
    changeIndex = setTimeout(() => {
      onChange(serialize(newValue));
    }, 300);
  };


  /* ========== 键入值监听 ==========*/
  const keyDown = (e) => {
    keyDownEvent(e, editor);
  };

  return (
    <div className={style.cleditor_wrap}>
      <Slate editor={editor} value={value} onChange={changeContent}>
        <Editable
          style={{
            minHeight: productType === "03" ? 0 : 150,
            padding: "8px 10px",
            maxHeight: 360,
            overflow: "auto",
            background: readOnly || false ? "#f5f6f7" : "#fff",
          }}
          readOnly={readOnly || false}
          renderElement={renderElement}
          onKeyDown={keyDown}
          onBlur={() => {
            setTarget(editor.selection.anchor);
            onBlur();
          }}
          onClick={onFocus}
        />
      </Slate>
    </div>
  );
});
