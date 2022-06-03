import React from "react";
import style from "../style.less";
import emojiList from "./emojiString";
export default ({ insetText }) => {
  return (
    <div className={style.emoji_content}>
      <div className={style.ul_div}>
        <ul className={style["f-ul"]}>
          <li className={style.is_set}>
            {Object.keys(emojiList).map((item, index) => {
              return (
                <span
                  key={index}
                  onClick={() => {
                    insetText(emojiList[item]);
                  }}
                >
                  {emojiList[item]}
                </span>
              );
            })}
          </li>
        </ul>
      </div>
      <div className={style.emoji_page}>Emoji表情不同设备显示不一致，请谨慎使用</div>
    </div>
  );
};
