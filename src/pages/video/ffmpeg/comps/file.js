import React, { useState, useEffect, useCallback } from "react";
import { Spin } from "antd";
import { createFFmpeg, fetchFile } from "@ffmpeg/ffmpeg";
export default () => {
  const [percentage, setPercentage] = useState(0);
  const ffmpeg = createFFmpeg({
    corePath: "https://unpkg.com/@ffmpeg/core@0.10.0/dist/ffmpeg-core.js",
    log: true,
  });
  /* ======== 文件转码 ======== */
  const transcode = useCallback(
    async ({ target: { files } }) => {
      const message = document.getElementById("message");
      const { name } = files[0];
      message.innerHTML = "Loading ffmpeg-core.js";
      if (!ffmpeg.isLoaded()) {
        await ffmpeg.load();
      }
      ffmpeg.setProgress(({ ratio }) => {
        setPercentage(Math.floor(ratio * 100));
      });
      ffmpeg.FS("writeFile", "name", await fetchFile(files[0]));
      message.innerHTML = "Start transcoding";
      await ffmpeg.run("-i", "name", "output.mp4");
      message.innerHTML = "Complete transcoding";
      const data = ffmpeg.FS("readFile", "output.mp4");
      const video = document.getElementById("output-video");
      video.src = URL.createObjectURL(new Blob([data.buffer], { type: "video/mp4" }));
    },
    [ffmpeg]
  );
  useEffect(() => {
    const elm = document.getElementById("uploader");
    elm.addEventListener("change", transcode);
  }, [transcode]);

  return (
    <div>
      <h3>文件形式</h3>
      <Spin tip={`解码中${percentage}%`} spinning={percentage > 0 && percentage < 100}>
        <video id="output-video" controls style={{ width: 300 }}></video>
        <br />
        <input type="file" id="uploader" />
        <p id="message"></p>
      </Spin>
    </div>
  );
};
