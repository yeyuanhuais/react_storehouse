import React, { useState, useRef, useEffect, useCallback } from "react";
import { Input, Spin, Button } from "antd";
import FfmpegFile from "./ffmpeg/file";
import FfmpegWebsite from "./ffmpeg/website";
export default () => {
  const [value, setValue] = useState(
    "https://qz-1300435011.cos.ap-guangzhou.myqcloud.com/1654760919181_SampleVideo_1280x720_1mb.mkv"
  );

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
    </div>
  );
};
