/*
 * @Description: 工具类-比如格式化函数等
 * @Author: Vivian
 * @Date: 2020-03-06 14:00:16
 * @LastEditTime: 2020-03-09 18:12:54
 */

// 自定义日期文案
export function formatter(day: any): any {
  if (day.type === "start") {
    day.bottomInfo = "入住";
  } else if (day.type === "end") {
    day.bottomInfo = "离店";
  }
  return day;
}

// 格式化日期 *月*日
export function formatDate(date: any): any {
  return `${date.getMonth() + 1}月${date.getDate()}日`;
}

// 获取天数差
export function getDiff(start: any, end: any): number {
  var days: number = end.getTime() - start.getTime();
  var times = days / (1000 * 60 * 60 * 24);
  return times;
}

// 格式化日期 *年*月*日
export function formatDate2(date: any): any {
  let year = date.split('T')[0].split('-')[0];
  let month = date.split('T')[0].split('-')[1];
  let day = date.split('T')[0].split('-')[2];
  if (month[0] === '0') {
    month = month[1]
  }
  if (day[0] === '0') {
    day = day[1]
  }
  if (year === new Date().getFullYear().toString()) {
    return `${month}月${day}日`;
  } else {
    return `${year}年${month}月${day}日`;
  }
}

// 保留两位小数，不足补0
export function returnFloat(value: number): string {
  let res = Math.round(value * 100) / 100;
  let s = res.toString().split(".");
  if (s.length == 1) {
    return res.toString() + ".00";
  }
  if (s.length > 1) {
    if (s[1].length < 2) {
      return res.toString() + "0";
    }
    return res.toString()
  }
}