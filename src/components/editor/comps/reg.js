export default {
  // eslint-disable-next-line
  url: /^((http|ftp|https):\/\/)?[\w\-_]+(\.[\w\-_]+)+([\w\-\\.,?^=%&amp;:/~\\+#]*[\w\-\\?^=%&amp;/~\\+#])?$/i,
  // eslint-disable-next-line
  urlchange:
    /(\s| )((http|ftp|https):\/\/)?[\w\-_]+(\.[\w\-_]+)+([\w\-\\.,?^=%&amp;:/~\\+#]*[\w\-\\?^=%&amp;/~\\+#])?(\s| )/gi,
  // eslint-disable-next-line
  urllen:
    /(\s| )((http|ftp|https):\/\/)?[\w\-_]+(\.[\w\-_]+)+([\w\-\\.,?^=%&amp;:/~\\+#]*[\w\-\\?^=%&amp;/~\\+#])?(\s| )/,
  // eslint-disable-next-line
  variable: /\{[\u4e00-\u9fa5_a-zA-Z0-9]+\}/gi,
  before_variable: /\{[\u4e00-\u9fa5_a-zA-Z0-9]+/gi,
  after_variable: /[\u4e00-\u9fa5_a-zA-Z0-9]+\}/gi,
};
