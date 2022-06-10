import React, { useState, useRef, useEffect, useCallback } from "react";
import { Input, Spin, Button } from "antd";
import { createFFmpeg, fetchFile } from "@ffmpeg/ffmpeg";
export default () => {
  const [value, setValue] = useState(
    "https://qz-1300435011.cos.ap-guangzhou.myqcloud.com/1654760919181_SampleVideo_1280x720_1mb.mkv"
  );
  const [percentage, setPercentage] = useState(0);
  const ffmpeg = createFFmpeg({
    corePath: "/public/js/ffmpeg_core/ffmpeg-core.js",
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
    const video = document.getElementById("output-video");
    video.src = URL.createObjectURL(new Blob([data.buffer], { type: "video/mp4" }));
  };
  /* ======== 文件转码 ======== */
  const transcode = useCallback(
    async ({ target: { files } }) => {
      const message = document.getElementById("message");
      const { name } = files[0];
      message.innerHTML = "Loading ffmpeg-core.js";
      await ffmpeg.load();
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
      <h2>ffmpeg实现web在线转码播放</h2>
      <p>文件形式</p>
      <Spin tip={`解码中${percentage}%`} spinning={percentage > 0 && percentage < 100}>
        <video id="output-video" controls style={{ width: 300 }}></video>
        <br />
        <input type="file" id="uploader" />
        <p id="message"></p>
      </Spin>
      <br />
      <p>网址形式</p>
      <Input onChange={({ target }) => setValue(target.value)} defaultValue={value} />
      <Button onClick={transcodeWebsite}>开始转码</Button>
      <br />
      <Spin tip={`解码中${percentage}%`} spinning={percentage > 0 && percentage < 100}>
        <video id="output-video" controls style={{ width: 300 }}></video>
        <br />
        <p id="message"></p>
      </Spin>
    </div>
  );
};
