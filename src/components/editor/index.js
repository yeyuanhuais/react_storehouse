import React, { useState, useEffect, useRef, memo } from "react";
import ToolBar from "./comps/toolBar";
import SmsEditor from "./editor";
import style from "./style.less";

/* @ props={readOnly,onChange,noTemp}
 * readOnly=只读
 * onChange=改变输入的内容
 * noTemp=是否需要插入模板
 */

export default memo((props) => {
  const editorRef = useRef();
  useEffect(() => {
    if (props.value) {
      editorRef.current.resetContent(props.value);
    }
  }, [props.value]);

  /* ========== 插入内容 ==========*/
  const onInsert = (type, content) => {
    if (type === "text") {
      editorRef.current.insertTextContent(content);
    } else if (type === "url") {
      editorRef.current.insertUrl(content);
    } else if (type === "variableString") {
      editorRef.current.insertVariable(content);
    } else if (type === "temp") {
      editorRef.current.resetContent(content);
    }
  };

  /* ========== 恢复，撤销 ==========*/
  const onRedo = (type) => {
    editorRef.current.reundo(type);
  };

  /* ========== 传递的子组件的值 ==========*/
  const child_props = {
    ref: editorRef,
    readOnly: props.readOnly || false,
    onChange: props.onChange ? props.onChange : (val) => {},
    productType: props.productType,
    onBlur() {},
    onFocus() {},
  };

  return (
    <div className={style.editorWrap}>
      <ToolBar onInsert={onInsert} onRedo={onRedo} {...props} />
      <SmsEditor {...child_props} />
    </div>
  );
});
