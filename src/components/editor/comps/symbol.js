import React from "react";
import style from "../style.less";
export default ({ insetSymbol }) => {
  const symbolList = [
    "︻",
    "︼",
    "︽",
    "︾",
    "〒",
    "↑",
    "↓",
    "☉",
    "⊙",
    "●",
    "〇",
    "◎",
    "★",
    "☆",
    "■",
    "「",
    "」",
    "『",
    "』",
    "〖",
    "〗",
    "◆",
    "◇",
    "▲",
    "△",
    "▼",
    "▽",
    "◣",
    "◥",
    "◢",
    "◣",
    "◤",
    "◥",
    "↑",
    "↓",
    "←",
    "→",
    "↖",
    "↗",
    "↙",
    "↘",
    "↔",
    "↕",
  ];
  return (
    <div className={style.emoji_content}>
      <div className={style.ul_div}>
        <ul className={style["f-ul"]}>
          <li className={style.is_set}>
            {symbolList.map((item, index) => {
              return (
                <span
                  style={{ color: "#252a3d" }}
                  key={index}
                  onClick={() => {
                    insetSymbol(item);
                  }}
                >
                  {item}
                </span>
              );
            })}
          </li>
        </ul>
      </div>
    </div>
  );
};
