import React, { useState } from "react";
import { Row, Col, Tooltip, Dropdown, Popconfirm, Input, message } from "antd";
import Emoji from "../emoji_comps/emoji";
import Symbol from "./symbol";
import MyIcon from "components/my_icon";
import SortURL from "../shorturl_comps/sortURL";
import SelectTemp from "../temp_comps";
import style from "../style.less";
import reg from "./reg";
export default (props) => {
  const [URLVisible, setURLVisible] = useState(false); //链接的弹窗
  const [selectTempVisible, setSelectTempVisible] = useState(false); //选择模板
  const [emojiVisible, setEmojiVisible] = useState(false); //emoji的弹窗
  const [symbolVisible, setSymbolVisible] = useState(false); //特殊符号的弹窗
  const [variableValue, setVariableValue] = useState(""); //插入变量的模板

  /* ==========  插入链接 ========== */
  const insetURL = (values) => {
    let { url } = values;
    props.onInsert("url", url);
    setURLVisible(false);
  };

  /* ==========  插入文本内容 ========== */
  const insetText = (_value) => {
    props.onInsert("text", _value);
    setEmojiVisible(false);
  };

  /* ==========  插入变量 ========== */
  const insetVariable = () => {
    reg.variable.lastIndex = 0;
    if (!reg.variable.test(`{${variableValue}}`)) {
      message.error("变量名称只能包含数字，字母，汉字和下划线");
    } else {
      props.onInsert("variableString", `{${variableValue}}`);
      setVariableValue("");
    }
  };

  /* ==========  插入AIM短链 ========== */
  const insetAim = () => {
    if ((props?.value || "").indexOf("{short_chain}") == -1) {
      props.onInsert("variableString", "{short_chain}");
    } else {
      message.error("只能插入一个AIM短链");
    }
  };

  /* ==========  插入模板内容 ========== */
  const cancelFn = (obj) => {
    if (obj) {
      props.onInsert("temp", obj?.content);
    }
    setSelectTempVisible(false);
  };

  return (
    <div className={style.headerWrap}>
      <Row>
        <Col flex={1}>
          <div className={style.btngroup} id="editorTool">
            <ul>
              <li>
                <Dropdown
                  overlay={<Emoji insetText={insetText} />}
                  placement="topLeft"
                  trigger={["click"]}
                  overlayClassName="emoji_down"
                  onVisibleChange={(flag) => {
                    setEmojiVisible(flag);
                  }}
                  visible={emojiVisible}
                >
                  <div className={style.emojibtn_wrap}>
                    <Tooltip title="插入表情" placement="bottom">
                      <MyIcon type="icon-emoji" className={style.btnicon} />
                    </Tooltip>
                  </div>
                </Dropdown>
              </li>
              {!props.noRedo && (
                <>
                  <li
                    onClick={() => {
                      props.onRedo("undo");
                    }}
                  >
                    <Tooltip title="撤回" placement="bottom">
                      <MyIcon type="icon-undo" className={style.btnicon} />
                    </Tooltip>
                  </li>
                  <li
                    onClick={() => {
                      props.onRedo("redo");
                    }}
                  >
                    <Tooltip title="恢复" placement="bottom">
                      <MyIcon type="icon-redo" className={style.btnicon} />
                    </Tooltip>
                  </li>
                </>
              )}
              {!props.noUrl && (
                <li
                  onClick={() => {
                    setURLVisible(true);
                  }}
                >
                  <Tooltip title="插入链接" placement="bottom">
                    <MyIcon type="icon-lianjie" className={style.btnicon} />
                  </Tooltip>
                </li>
              )}
              {!props.noVariable && (
                <li>
                  <Popconfirm
                    icon={<></>}
                    trigger="hover"
                    overlayClassName={style.variable_pop_wrap}
                    placement="bottom"
                    okText="插入"
                    title={() => {
                      return (
                        <>
                          <label>插入变量：</label>
                          <Input
                            placeholder="插入变量名"
                            type="small"
                            value={variableValue}
                            onChange={(e) => {
                              setVariableValue(e.target.value);
                            }}
                            onPressEnter={insetVariable}
                          />
                        </>
                      );
                    }}
                    cancelText={null}
                    showCancel={false}
                    onConfirm={insetVariable}
                  >
                    <div style={{ width: "100%" }}>
                      <MyIcon type="icon-bianliang" className={style.btnicon} />
                    </div>
                  </Popconfirm>
                </li>
              )}
              {!props.noAim && (
                <li onClick={insetAim}>
                  <Tooltip title="插入AIM短链" placement="bottom">
                    <MyIcon type="icon-icon" className={style.btnicon} />
                  </Tooltip>
                </li>
              )}
              {!props.noSymbol && (
                <li>
                  <Dropdown
                    overlay={<Symbol insetSymbol={insetText} />}
                    placement="topLeft"
                    trigger={["click"]}
                    overlayClassName="emoji_down"
                    onVisibleChange={(flag) => {
                      setSymbolVisible(flag);
                    }}
                    visible={symbolVisible}
                  >
                    <div className={style.emojibtn_wrap}>
                      <Tooltip title="插入特殊符号" placement="bottom">
                        <MyIcon type="icon-fuhao" className={style.btnicon} />
                      </Tooltip>
                    </div>
                  </Dropdown>
                </li>
              )}
            </ul>
          </div>
        </Col>
        {!props.noTemp && (
          <Col flex="120px">
            <div
              className={`${style.selectTemp}`}
              onClick={() => {
                setSelectTempVisible(true);
              }}
            >
              <MyIcon type="moban" style={{ fontSize: 16 }} />
              <span>选择模板</span>
            </div>
          </Col>
        )}
      </Row>
      {URLVisible && (
        <SortURL
          visible={URLVisible}
          onCreate={insetURL}
          onCancel={() => {
            setURLVisible(false);
          }}
        />
      )}
      {selectTempVisible && <SelectTemp cancelFn={cancelFn} />}
    </div>
  );
};
