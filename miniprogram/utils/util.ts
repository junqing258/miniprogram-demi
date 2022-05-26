export const formatTime = (date: Date) => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hour = date.getHours();
  const minute = date.getMinutes();
  const second = date.getSeconds();

  return (
    [year, month, day].map(formatNumber).join("/") +
    " " +
    [hour, minute, second].map(formatNumber).join(":")
  );
};

const formatNumber = (n: number) => {
  const s = n.toString();
  return s[1] ? s : "0" + s;
};

export const isNil = (val: null | undefined) =>
  val === undefined || val === null;

export const isEmpty = (val: any) =>
  val == null || !(Object.keys(val) || val).length;

/**
 * object转化成url拼接样式
 * @param obj 需要转化的参数
 * objToUrl({name:'hehe',age:10})
 */
export const objToUrl = (obj: any) => {
  let arr = [];
  for (let i in obj) {
    if (obj.hasOwnProperty(i)) {
      arr.push(encodeURIComponent(i) + "=" + encodeURIComponent(obj[i]));
    }
  }
  return arr.join("&");
};

/**
 * url转化成object拼接样式
 * @param url 需要转化的参数
 * urlToObj("a=1&b=2")
 */
export const urlToObj = (url: string) => {
  let string = url.split("&");
  let res = {};
  for (let i = 0; i < string.length; i++) {
    let str = string[i].split("=");
    if (str[0] != "") {
      res[str[0]] = str[1];
    }
  }
  return res;
};
