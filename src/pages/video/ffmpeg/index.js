import React, { useState, useRef, useEffect, useCallback } from "react";
import { Input, Spin, Button } from "antd";
import FfmpegFile from "./comps/file";
import FfmpegWebsite from "./comps/website";
import style from "./index.module.less";
export default () => {
  const [value, setValue] = useState(
    "https://qz-1300435011.cos.ap-guangzhou.myqcloud.com/1654760919181_SampleVideo_1280x720_1mb.mkv"
  );
  const data = [
    { name: "理财", num: 10 },
    { name: "古玩", num: 10 },
    { name: "体育", num: 10 },
    { name: "唱歌", num: 10 },
    { name: "跳舞", num: 10 },
  ];
  return (
    <div>
      <div style={{ display: "flex", alignItems: "center" }}>
        <span style={{ wordBreak: " keep-all" }}>视频在线地址：</span>
        <Input onChange={({ target }) => setValue(target.value)} defaultValue={value} />
      </div>
      <br />
      <div>
        <h2>ffmpeg实现web在线转码播放</h2>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-around" }}>
          <FfmpegFile />
          <FfmpegWebsite value={value} />
        </div>
      </div>
      <div>
        <div className={style.out}>
          {data.map((item, index) => (
            <div key={index} className={style.one}>
              {item.name}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
