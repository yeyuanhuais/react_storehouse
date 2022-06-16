import React, { useState, useEffect, useRef, useMemo } from "react";
import { Modal, Button, message, Tooltip } from "antd";
import MyIcon from "components/my_icon";
import style from "./index.module.less";
import axios from "@/plugins/axios";
import { CloseCircleOutlined } from "@ant-design/icons";
let last = null;
export default () => {
  const inputRef = useRef();
  const [visible, setVisible] = useState(false); //弹窗
  const [phones, setPhones] = useState([]); //设置获得的值
  const [confirmLoading, setConfirmLoading] = useState(false); //弹窗确认loading中
  const [isFocus, setIsFocus] = useState(false);
  const [placeholder, setPlaceholder] = useState(true);

  /* ========== 点击输入外框时 ========== */
  const wrapFocus = (e) => {
    setIsFocus(true);
    inputRef.current.focus();
  };
  /* ========== 焦点到input外 ========== */
  const inputBlur = (e) => {
    setIsFocus(false);
    e.preventDefault();
    if (e.target.value) {
      let arr = [...phones];
      let text = e.target.value;
      text = text.replace("，", ",");
      let textarr = text.split(",");
      arr = arr.concat(textarr.filter((item) => item !== ""));
      setPhones(arr);
      e.target.value = "";
    }
  };

  /* ========== 按键 ========== */
  const inputKeyDown = (e) => {
    let text = e.target.value;
    if ((e.keyCode === 13 || e.keyCode === 32 || e.keyCode === 188) && text.replace(/ /g, "") !== "") {
      e.preventDefault();
      let arr = [...phones];
      text = text.replace("，", ",");
      let textarr = text.split(",");
      arr = arr.concat(textarr.filter((item) => item !== ""));
      setPhones(arr);
      e.target.value = "";
      e.target.focus();
    } else if (e.keyCode === 8 && text === "" && phones.length > 0) {
      e.preventDefault();
      let arr = [...phones];
      arr.pop();
      setPhones(arr);
      e.target.focus();
    }
  };

  const inputKeyUp = (e) => {
    const text = e.target.value;
    if (text === "" && phones.length === 0) {
      setPlaceholder(true);
    } else {
      setPlaceholder(false);
    }
  };

  const inpuPaste = () => {
    setTimeout(() => {
      let text = inputRef.current.value;
      if (text) {
        text = text.replace(/\s|\r|\n/g, ",");
        let arr = text.split(",").filter((item) => {
          return item !== "";
        });
        setPhones([...phones, ...arr]);
        inputRef.current.value = "";
        inputRef.current.focus();
      }
    }, 100);
  };

  /* ========== 删除多余号码 ========== */
  const delectPhone = (index) => {
    let arr = [...phones];
    arr.splice(index, 1);
    setPhones(arr);
    if (inputRef.current.value === "" && arr.length === 0) {
      setPlaceholder(true);
    } else {
      setPlaceholder(false);
    }
  };

  /* ==========组件消失时清空 ========== */
  useEffect(() => {
    return () => {
      last = null;
    };
  }, []);
  return (
    <div>
      <div>
        <h2>输入框输入号码回车以tag显示</h2>
        <div
          className={`${style.textarea_wrap} ${isFocus ? style.focused : ""} ${placeholder ? style.placeholder : ""}`}
          onClick={wrapFocus}
        >
          {phones.map((item, index) => (
            <span key={index} className={`${style.phones_s} ${!/^\d{8,15}$/.test(item) ? style.error : ""}`}>
              <span>{item}</span>
              <span className={style.closebtn} onClick={() => delectPhone(index)}>
                <CloseCircleOutlined style={{ fontSize: 16 }} />
              </span>
            </span>
          ))}
          <span className={style.input_wrap}>
            <input
              ref={inputRef}
              onBlur={inputBlur}
              onKeyDown={inputKeyDown}
              onKeyUp={inputKeyUp}
              onPaste={inpuPaste}
            />
          </span>
        </div>
        <div className={style.manual_total}>
          <span className={style.number}>
            <span className="primary">{phones.length}</span>/10000
          </span>
          个
          <div>请输入国家码+手机号: 例如国家码是852，手机号码是8526666XXXX</div>
        </div>
      </div>
    </div>
  );
};
