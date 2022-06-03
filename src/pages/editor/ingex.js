
import { useState } from "react";
import Editor from "components/editor";
import TextNumber from "components/editor/text_number";
export default () => {
    const [value, setValue] = useState("");
    return <div>
        <Editor
            url
            emoji
            redo
            variable
            symbol
            temp
            onChange={(data) => setValue(data)}
        ></Editor>
        <TextNumber smscontent={value}></TextNumber></div>
}