import React from "react";
export default (props) => {
  return (
    <div className="box" style={props.accountCom ? { height: "98%" } : null}>
      <div className="box-title">
        {props.button ? (
          <div className="title_wrap">
            <div className="title_name">{props.title || "标题"}</div>
            <div className="buttongroup">{props.button}</div>
          </div>
        ) : (
          <div className="title_name">{props.title || "标题"}</div>
        )}
      </div>
      <div className="box-content">{props.children}</div>
    </div>
  );
};
