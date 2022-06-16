import CryptoJS from "crypto-js";
import emojiList from "components/editor/emoji_comps/emojiString";
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
/*
 * 字符串to转义符的互换
 * 在textarea里面用普通展示，页面的呈现时，变为转义符展示，数据库保存普通字符
 * */
export const html2Escape = (sHtml) => {
  if (!sHtml) {
    return "";
  }
  sHtml = sHtml.replace(/[<>&"]/g, (c) => {
    return { "<": "&lt;", ">": "&gt;", "&": "&amp;", "\"": "&quot;" }[c];
  });
  sHtml = sHtml.replace(/\n|\r\n/g, "<br/>");
  sHtml = sHtml.replace(/ /g, "&nbsp;");
  // eslint-disable-next-line no-irregular-whitespace
  sHtml = sHtml.replace(/　/g, "&emsp;");
  sHtml = sHtml.replace(/\[:.+?:\]/g, (c) => {
    let key = c.replace(/(\[:|:\])/g, "").toLocaleUpperCase();
    return emojiList[key] ? emojiList[key] : `[:${key}:]`;
  }); //更换emoji标签算两个字符
  return sHtml;
};
/**
 * @description 查找包含自身节点的父代节点
 * @param tree 需要查找的树数据
 * @param curKey 当前节点key
 * @param keyField 自定义 key 字段
 * @param node 找到的node 可以不传
 */
export const findCurNode = (tree, curKey, keyField, node = null) => {
  const stack = [];
  for (const item of tree) {
    if (item) {
      stack.push(item);
      while (stack.length) {
        const temp = stack.pop();

        if (temp[keyField] === curKey) {
          node = temp;
          break;
        }

        const children = temp.children || [];
        for (let i = children.length - 1; i >= 0; i--) {
          stack.push(children[i]);
        }
      }
    }
  }
  return node;
};
/**
 * @description tree数据扁平化
 * @param tree 需要查找的树数据
 */
export const treeToArray = (tree) => {
  return tree.reduce((res, item) => {
    const { children, ...i } = item;
    return res.concat(i, children && children.length ? treeToArray(children) : []);
  }, []);
};
  /**
 * @description 查找包含自身节点的父代节点
 * @param tree 需要查找的树
 * @param func 判断是否节点是否相等的函数
 * @param keyField 自定义 key 字段
 * @param isNode 是否是节点，false 为 node 节点 ； true 为 key
 * @param path 结果数组 可以不传
 */
export const findTreeSelect = (tree, func, keyField, isNode = false, path = []) => {
  if (!tree) { return []; }
  for (const data of tree) {
    isNode ? path.push(data) : path.push(data[keyField]);
    if (func(data)) { return path; }
    if (data.children && data.children.length) {
      const findChildren = findTreeSelect(data.children, func, keyField, isNode, path);
      if (findChildren.length) { return findChildren; }
    }
    path.pop();
  }
  return [];
};

