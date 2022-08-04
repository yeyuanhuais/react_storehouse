import React, { useEffect } from "react";
import ColorPicker from "components/color_pick/index";
const FORMATS = ["hsl", "hsv", "hex", "rgb"];

// 默认hsv值
const defaultHSV = {
  h: 360,
  s: 1,
  v: 1,
  a: 1,
};
export default () => {
  function run($result: HTMLElement, instance: any, colors: object, alpha?: boolean) {
    const parts: Array<string> = ["h", "s", "v"];
    if (alpha) {
      parts.push("a");
    }
    let html = "<ul>";
    parts.forEach((e) => {
      html += `<li>${e.toLocaleUpperCase()}:  ${colors[e]}</li>`;
    });
    html += "</ul>";
    html += "<ul>";
    FORMATS.forEach((format) => {
      const color = instance.getValue(format);
      html += `<li><span class="color-block" style="background:${color}"></span>${format.toLocaleUpperCase()}: ${color}</li>`;
    });
    html += "</ul>";
    $result.innerHTML = html;
  }
  useEffect(() => {
    const $demo1 = document.getElementById("demo1");
    const $demo1Result = document.getElementById("demo1-result");

    const instance = new ColorPicker($demo1 as HTMLElement, {
      change(color: any, colors: object) {
        run($demo1Result as HTMLElement, this, colors);
      },
    }); //获取颜色值
    run($demo1Result as HTMLElement, instance, defaultHSV);
    const $demo2 = document.getElementById("demo2");
    const $demo2Result = document.getElementById("demo2-result");

    const instance2 = new ColorPicker($demo2 as HTMLElement, {
      value: "#6bc30d",
      alpha: true,
      change(color: any, colors: object) {
        run($demo2Result as HTMLElement, this, colors);
      },
    });
    run($demo2Result as HTMLElement, instance2, {
      h: 89,
      s: 93,
      v: 76,
      a: 1,
    });
  }, []);
  return (
    <div style={{ display: "flex", width: "100%" }}>
      <div className="demo-box" style={{ display: "flex", width: "50%" }}>
        <div className="demo">
          <div id="demo1"></div>
        </div>
        <div className="demo-result" id="demo1-result" style={{ marginLeft: 10 }}></div>
      </div>
      <div className="demo-box" style={{ display: "flex", width: "50%" }}>
        <div className="demo">
          <div id="demo2"></div>
        </div>
        <div className="demo-result" id="demo2-result" style={{ marginLeft: 10 }}></div>
      </div>
    </div>
  );
};
