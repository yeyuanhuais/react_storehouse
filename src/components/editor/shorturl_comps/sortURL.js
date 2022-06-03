import React, { useState, useEffect, useCallback } from "react";
import { Form, Modal, Input, Button, Tooltip, Checkbox, Row, Col, Space, Select, Radio } from "antd";
import style from "../style.less";
export default ({ visible, onCreate, onCancel }) => {
  const [form] = Form.useForm();

  return (
    <Modal
      visible={visible}
      title="插入链接"
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            onCreate({
              url: values.url,
            });
            form.resetFields();
          })
          .catch((info) => {
            console.log("Validate Failed:", info);
          });
      }}
    >
      <div className={style.sortUrlWrap}>
        <Form form={form} layout="vertical" name="form_in_modal">
          <Form.Item label="普通链接" required name="url" rules={[{ required: true, message: "链接地址不能为空" }]}>
            <Input placeholder="请输入链接地址" autoComplete="off" />
          </Form.Item>

          <dl className={style.dlgray}>
            <dt>链接创建</dt>
            <dd>
              请在【输入框】内写入链接，点击【确认】将插入到短信内容框，使用本功能插入的链接，将在链接前后自动插入空格符号，并在短信内容中呈现为链接形态，不支持修改，仅支持删除
            </dd>
            <dd>
              该功能是为了防范不同终端系统对链接的识别失败，或防范链接置于内容尾部时忘记加入空格，跟其他字符粘连造成链接无法被终端用户点击打开
            </dd>
          </dl>
        </Form>
      </div>
    </Modal>
  );
};
