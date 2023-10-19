import React, { useState, useRef, useEffect, useCallback } from "react";
import { Input, Spin, Button } from "antd";
import EZUIKit from "ezuikit-js";
export default () => {
  const [value, setValue] = useState("at.83wh57p5320f2qd769xgbqc2211a5g0h-1vy8zlvtn6-00jw8v2-h9no422so");
  const [deviceSerial, setDeviceSerial] = useState("G44748224");
  const [player, setPlayer] = useState("");
  useEffect(() => {
    if (!value || !deviceSerial) return;
    let player1 = new EZUIKit.EZUIKitPlayer({
      id: "video-container", // 视频容器ID
      accessToken: value,
      url: `ezopen://open.ys7.com/${deviceSerial}/1.hd.live`,
      // simple - 极简版; pcLive-pc直播；pcRec-pc回放；mobileLive-移动端直播；mobileRec-移动端回放;security - 安防版;voice-语音版;
      //template: 'simple',
      plugin: ["talk"], // 加载插件，talk-对讲
      width: 600,
      height: 400,
    });
    setPlayer(player1);
    window.player = player1;
  }, [deviceSerial, value]);

  const fullScreen = () => {
    player.fullScreen();
  };
  const play = () => {
    let playPromise = player.play();
    playPromise.then((data) => {
      console.log("promise 获取 数据", data);
    });
  };
  const stop = () => {
    let stopPromise = player.stop();
    stopPromise.then((data) => {
      console.log("promise 获取 数据", data);
    });
  };
  return (
    <div>
      <div style={{ display: "flex", alignItems: "center" }}>
        <span style={{ wordBreak: " keep-all" }}>accessToken：</span>
        <Input onChange={({ target }) => setValue(target.value)} defaultValue={value} />
      </div>
      <div style={{ display: "flex", alignItems: "center" }}>
        <span style={{ wordBreak: " keep-all" }}>序列号：</span>
        <Input onChange={({ target }) => setDeviceSerial(target.value)} defaultValue={deviceSerial} />
      </div>
      <br />
      <div>
        <h2>萤石云播放</h2>
        <div className="demo">
          <h2>视频模式使用示例：</h2>
          <div id="video-container" style={{ width: 600, height: 600 }}></div>
          {player && (
            <div>
              <button onClick={() => stop()}>stop</button>
              <button onClick={() => play()}>play</button>
              <button onClick={() => fullScreen()}>fullScreen</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
