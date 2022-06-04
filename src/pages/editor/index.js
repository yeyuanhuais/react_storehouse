import React, { useState } from "react";
import Editor from "components/editor";
import TextNumber from "components/editor/text_number";
export default () => {
  const [value, setValue] = useState("111");
  return (
    <div>
      <div>
        <h2>slate编辑器</h2>
        <Editor url emoji redo variable symbol temp onChange={(data) => setValue(data)} value={value}></Editor>
        <TextNumber smscontent={value}></TextNumber>
      </div>
    </div>
  );
};
