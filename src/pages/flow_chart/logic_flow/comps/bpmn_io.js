import React from "react";
import LogicFlow from "@logicflow/core";
import downloadImg from "@/assets/images/download.png";
import photo from "@/assets/images/img.png";
import uploadImg from "@/assets/images/upload.png";
import styles from "../index.less";

const download = (filename, text) => {
  let element = document.createElement("a");
  element.setAttribute("href", `data:text/plain;charset=utf-8,${encodeURIComponent(text)}`);
  element.setAttribute("download", filename);

  element.style.display = "none";
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
};

export default ({ lf }) => {
  const downloadXml = (e) => {
    const data = lf.getGraphData();
    download("logic-flow.xml", data);
  };
  const uploadXml = (ev) => {
    const file = ev.target.files[0];
    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target) {
        const xml = event.target.result;
        lf.render(xml);
      }
    };
    reader.readAsText(file); // you could also read images and other binaries
  };

  const downloadImage = () => {
    lf.getSnapshot();
  };

  return (
    <div className={styles["graph-io"]}>
      <span title="下载 XML" onClick={() => downloadXml()}>
        <img src={downloadImg} alt="下载XML" />
      </span>
      <span className={styles["download-img"]} title="下载图片" onClick={() => downloadImage()}>
        <img src={photo} alt="下载图片" />
      </span>
      <span className={styles["upload-xml"]} title="上传 XML">
        <input type="file" className={styles.upload} onChange={(ev) => uploadXml(ev)} />
        <img src={uploadImg} alt="上传XML" />
      </span>
    </div>
  );
};
