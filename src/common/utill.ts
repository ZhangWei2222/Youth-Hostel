// 自定义日期文案
export function formatter(day: any): any {
  if (day.type === "start") {
    day.bottomInfo = "入住";
  } else if (day.type === "end") {
    day.bottomInfo = "离店";
  }
  return day;
}

// 格式化日期
export function formatDate(date: any): any {
  return `${date.getMonth() + 1}月${date.getDate()}日`;
}
// 获取天数差
export function getDiff(start: any, end: any): number {
  var days: number = end.getTime() - start.getTime();
  var times = days / (1000 * 60 * 60 * 24);
  return times;
}