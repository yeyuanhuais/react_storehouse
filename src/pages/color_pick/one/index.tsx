import React, { useEffect } from "react";
import ColorPicker from "components/color_pick/index";
export default () => {
  const FORMATS = ["hsl", "hsv", "hex", "rgb"];

  // 默认hsv值
  const defaultHSV = {
    h: 360,
    s: 1,
    v: 1,
    a: 1,
  };
  function run($result, instance, colors, alpha) {
    const parts = ["h", "s", "v"];
    if (alpha) {
      parts.push("a");
    }
    let html = "<ul>";
    parts.forEach((e) => (html += `<li>${e.toLocaleUpperCase()}:  ${colors[e]}</li>`));
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

    const instance = new ColorPicker($demo1, {
      change(color, colors) {
        run($demo1Result, this, colors);
      },
    });
    run($demo1Result, instance, defaultHSV);
    const $demo2 = document.getElementById("demo2");
    const $demo2Result = document.getElementById("demo2-result");

    const instance2 = new ColorPicker($demo2, {
      value: "#6bc30d",
      alpha: true,
      change(color, colors) {
        run($demo2Result, this, colors);
      },
    });
    run($demo2Result, instance2, {
      h: 89,
      s: 93,
      v: 76,
      a: 1,
    });
  }, []);
  return (
    <>
      <div className="demo-box" style={{ display: "flex" }}>
        <div className="demo" style={{ width: 240, height: 240 }}>
          <div id="demo1"></div>
        </div>
        <div className="demo-result" id="demo1-result"></div>
      </div>
      <div className="demo-box" style={{ display: "flex" }}>
        <div className="demo">
          <div id="demo2"></div>
        </div>
        <div className="demo-result" id="demo2-result"></div>
      </div>
    </>
  );
};
