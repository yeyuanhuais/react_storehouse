import CryptoJS from "crypto-js";
/* ========== 设置验证规则 ========== */
export const reg = {
  psw: /^.*(?=.{6,16})(?=.*\d{1,})(?=.*[a-zA-Z]{1,})(?=.*[!@#$%^&*.?\\]).*$/,
  // psw: /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$]).{6,16}$/,
  email: /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/,
};

/* ========== 密码 加密 老版本规则 已去掉 ========== */
export const encrypt = (word, keyStr) => {
  keyStr = keyStr || "abcdefgabcdefg12";
  let key = CryptoJS.enc.Utf8.parse(keyStr); //Latin1 w8m31+Yy/Nw6thPsMpO5fg==
  let srcs = CryptoJS.enc.Utf8.parse(word);
  let encrypted = CryptoJS.AES.encrypt(srcs, key, { mode: CryptoJS.mode.ECB, padding: CryptoJS.pad.Pkcs7 });
  return encrypted.toString();
};
/** 解密 */
export const decrypt = (word, keyStr) => {
  keyStr = keyStr || "abcdefgabcdefg12";
  let key = CryptoJS.enc.Utf8.parse(keyStr); //Latin1 w8m31+Yy/Nw6thPsMpO5fg==
  let decrypted = CryptoJS.AES.decrypt(word, key, { mode: CryptoJS.mode.ECB, padding: CryptoJS.pad.Pkcs7 });
  return CryptoJS.enc.Utf8.stringify(decrypted).toString();
};
