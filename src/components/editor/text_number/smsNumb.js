import emojiList from "../emoji_comps/emojiString";
import reg from "../comps/reg";
/* ========== 显示文字 ========== */
const changeTxt = (toall_len, first_num, next_num) => {
  let n = 1;
  if (toall_len <= first_num) {
    return {
      html: `总计${toall_len}个字，<span>第${n}条<b>${toall_len}</b>/${first_num}个字</span>`,
      n,
    };
  } else {
    n = Math.ceil(toall_len / next_num);
    let CountHtml = `总计${toall_len}个字，`;
    for (let i = 1; i <= n - 1; i++) {
      if (i <= 2) {
        CountHtml += `<span>第${i}条${next_num}个字,</span>`;
      }
    }
    CountHtml += n > 3 ? "<span>···</span>" : "";
    CountHtml += `<span>第${n}条<b>${toall_len - (n - 1) * next_num}</b>/${next_num}个字</span>`;
    return {
      html: CountHtml,
      n,
    };
  }
};

/* ==========改变展示信息 ========== */
const showSms = (n, next_num, content) => {
  let html = [];
  if (n === 1) {
    //如果一条短信
    html.push(content);
  } else {
    for (let i = 1; i <= n; i++) {
      html.push(content.substr(0, next_num));
      content = content.substr(next_num);
    }
  }
  return html;
};

/* ==========短信内容字数统计 ========== */
const smsNumb = (content = "", lang = "zh") => {
  let cont_len = content.length; //内容长度;
  let result = null;
  if (lang === "zh") {
    //如果是国内短信
    result = changeTxt(cont_len, 70, 67);
  } else {
    //其他按照国际短信计算
    let GSM_str =
      "@£$¥èéùìòÇØøÅåΔ_ΦΓΛΩΠΨΣΘΞ^{}\\[~] \n\r|€ÆæßÉ!\"#¤%&'()*+,-./0123456789:;<=>?¡ABCDEFGHIJKLMNOPQRSTUVWXYZÄÖÑÜ§¿abcdefghijklmnopqrstuvwxyzäöñüà";
    GSM_str += "【】";
    if (cont_len > 0) {
      const strArr = content.split("");
      const isInGsm = strArr.every((item) => {
        return GSM_str.indexOf(item) > -1;
      });
      if (isInGsm) {
        //如果全部在GSM编码里
        const twoByte = "^{}\\[~]€|"; //这些字符算两个
        const filtersArr = strArr.filter((item) => {
          return twoByte.indexOf(item) > -1;
        });
        result = changeTxt(cont_len + filtersArr.length, 160, 153);
      } else {
        //如果不在就按照中文规则算
        result = changeTxt(cont_len, 70, 67);
      }
    } else {
      //如果为空时
      result = changeTxt(cont_len, 160, 153);
    }
  }
  return {
    len: cont_len, //总字符数
    html: result.html, //统计的显示html
    n: result.n, //共有多少条
    smsList: showSms(result.n, 67, content) || [],
  };
};

export default smsNumb;
