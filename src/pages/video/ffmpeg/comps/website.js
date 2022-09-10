import React, { useState } from "react";
import { Spin, Button } from "antd";
import { createFFmpeg, fetchFile } from "@ffmpeg/ffmpeg";
export default ({ value }) => {
  const [percentage, setPercentage] = useState(0);
  const ffmpeg = createFFmpeg({
    corePath: "https://unpkg.com/@ffmpeg/core@0.10.0/dist/ffmpeg-core.js",
    log: true,
  });
  /* ======== 网址转码 ======== */
  const transcodeWebsite = async () => {
    const message = document.getElementById("message");
    message.innerHTML = "Loading ffmpeg-core.js";
    if (!ffmpeg.isLoaded()) {
      await ffmpeg.load();
    }
    ffmpeg.setProgress(({ ratio }) => {
      setPercentage(Math.floor(ratio * 100));
    });
    ffmpeg.FS("writeFile", "name", await fetchFile(value));
    message.innerHTML = "Start transcoding";
    await ffmpeg.run("-i", "name", "output.mp4");
    message.innerHTML = "Complete transcoding";
    const data = ffmpeg.FS("readFile", "output.mp4");
    const video = document.getElementById("output-video1");
    video.src = URL.createObjectURL(new Blob([data.buffer], { type: "video/mp4" }));
  };
  return (
    <div>
      <h3>网址形式</h3>
      <Spin tip={`解码中${percentage}%`} spinning={percentage > 0 && percentage < 100}>
        <video id="output-video1" controls style={{ width: 300 }}></video>
        <br />
        <p id="message"></p>
        <Button onClick={transcodeWebsite}>开始转码</Button>
      </Spin>
    </div>
  );
};
