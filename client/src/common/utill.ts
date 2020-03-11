/*
 * @Description: 工具类-比如格式化函数等
 * @Author: Vivian
 * @Date: 2020-03-06 14:00:16
 * @LastEditTime: 2020-03-11 19:07:42
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

// 格式化订的房间日期
export function formatOrderDate(time: any, days: number): any {
  let timeObj: any = new Date(time);
  let year = timeObj.getFullYear();
  let month = timeObj.getMonth() + 1
  let date = timeObj.getDate()
  let endTimeObj = new Date((timeObj / 1000 + (86400 * days)) * 1000); // 增加n天后的日期
  let endYear = endTimeObj.getFullYear();
  let endMonth = endTimeObj.getMonth() + 1
  let endDate = endTimeObj.getDate()
  if (new Date().getFullYear() === year) {
    if (year === endYear) {
      if (month === endMonth) {
        return `${month}月${date}日-${endDate}日`
      } else {
        return `${month}月${date}日-${endMonth}月${endDate}日`
      }
    } else {
      return `${month}月${date}日-${endYear}年${endMonth}月${endDate}日`
    }
  } else {
    return `${year}年${month}月${date}日-${endYear}年${endMonth}月${endDate}日`
  }
}

// 格式化下订单的日期 yyyy-mm月-dd日 hh:ss:SS
export function formatOrderTime(time: any): any {
  let timeObj = new Date(time);
  let year = timeObj.getFullYear();
  let month = (timeObj.getMonth() + 1).toString().length < 2 ? "0" + (timeObj.getMonth() + 1).toString() : (timeObj.getMonth() + 1);
  let date = timeObj.getDate().toString().length < 2 ? "0" + timeObj.getDate().toString() : timeObj.getDate();
  let hour = timeObj.getHours().toString().length < 2 ? "0" + timeObj.getHours().toString() : timeObj.getHours();
  let minute = timeObj.getMinutes().toString().length < 2 ? "0" + timeObj.getMinutes().toString() : timeObj.getMinutes();
  let second = timeObj.getSeconds().toString().length < 2 ? "0" + timeObj.getSeconds().toString() : timeObj.getSeconds();
  return year + '/' + month + '/' + date + " " + hour + ":" + second + ":" + minute
}

// 格式化订单状态文案
export function formatOrderStatus(value: number): any {
  let temp: string = '';
  switch (value) {
    case -3:
      temp = '被取消'
      break;
    case -2:
      temp = '已退房'
      break;
    case -1:
      temp = '待入住'
      break;
    case 0:
      temp = '待评价'
      break;
    case 1:
      temp = '已评价'
      break;
    default:
      break;
  }
  return temp;
}