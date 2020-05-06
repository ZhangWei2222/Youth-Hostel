/*
 * @Description: 工具类-比如格式化函数等
 * @Author: Vivian
 * @Date: 2020-03-06 14:00:16
 * @LastEditTime: 2020-05-06 20:32:28
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
  if (date.getFullYear() !== new Date().getFullYear()) {
    return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`;
  }
  return `${date.getMonth() + 1}月${date.getDate()}日`;
}

// 格式化日期 *.*
export function formatDate3(date: any): any {
  if (date.getFullYear() !== new Date().getFullYear()) {
    return `${date.getFullYear()}.${date.getMonth() + 1}.${date.getDate()}`;
  }
  return `${date.getMonth() + 1}.${date.getDate()}`;
}

// 获取天数差
export function getDiff(start: any, end: any): number {
  var days: number = end.getTime() - start.getTime();
  var times = days / (1000 * 60 * 60 * 24);
  return times;
}

// 格式化日期 *年*月*日
export function formatDate2(date: any): any {
  let year = new Date(date).getFullYear();
  let month = new Date(date).getMonth() + 1;
  let day = new Date(date).getDate();
  if (year === new Date().getFullYear()) {
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

// 格式化商品详情页+下订单页+搜索页的日期
export function formatRoomDate(date: any): any {
  if (date.start.match("年")) {
    if (date.start.split("月")[0] === date.end.split("月")[0]) {
      return date.start + "-" + date.end.split("月")[1];
    } else {
      return date.start + "-" + date.end.split("年")[1];
    }
  } else {
    if (date.start.split("月")[0] === date.end.split("月")[0]) {
      return date.start + "-" + date.end.split("月")[1];
    } else {
      return date.start + "-" + date.end;
    }
  }
}

// 格式化订的房间日期
export function formatOrderDate(time: any, days: number): any {
  let timeObj: any = new Date(time.toString());
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
  return year + '/' + month + '/' + date + " " + hour + ":" + minute + ":" + second
}

// 格式化订单状态文案
export function formatOrderStatusText(status: number, isCheckIn?: number): any {
  let temp = {
    text: "",
    commentText: '',
    disabledButton: false
  }
  switch (status) {
    case -6:
      temp = {
        text: "退房中...",
        commentText: "退房中...",
        disabledButton: true
      }
      break;
    case -5:
      temp = {
        text: "评价已关闭",
        commentText: "评价已关闭",
        disabledButton: true
      }
      break;
    case -4:
      temp = {
        text: "未入住",
        commentText: "未入住",
        disabledButton: true
      }
      break;
    case -3:
      temp = {
        text: "被取消",
        commentText: "被取消",
        disabledButton: true
      }
      break;
    case -2:
      temp = {
        text: "已退房",
        commentText: "已退房",
        disabledButton: true
      }
      break;
    case -1:
      if (isCheckIn === 0) {
        temp.text = "待入住";
        temp.commentText = "申请退房"
      } else {
        temp = {
          text: "已入住",
          commentText: "评价待开启",
          disabledButton: true
        }
      }
      break;
    case 0:
      temp.text = "待评价";
      temp.commentText = "立即评价"
      break;
    case 1:
      temp = {
        text: "已评价",
        commentText: "已评价",
        disabledButton: true
      }
      break;
    default:
      break;
  }
  return temp;
}

// 格式化订单状态文案(店家管理页面)
export function formatAdminStatusText(status: number, isCommented?: boolean, isCheckIn?: number): any {
  let temp = {
    text: "",
    commentText: '',
    disabledButton: false
  }
  switch (status) {
    case -6:
      temp = {
        text: "处理退房",
        commentText: "确认退房",
        disabledButton: false
      }
      break;
    case -5:
      temp = {
        text: "评价已关闭",
        commentText: "评价已关闭",
        disabledButton: true
      }
      break;
    case -4:
      temp = {
        text: "未入住",
        commentText: "未入住",
        disabledButton: true
      }
      break;
    case -3:
      temp = {
        text: "已取消",
        commentText: "已取消",
        disabledButton: true
      }
      break;
    case -2:
      temp = {
        text: "已处理退房",
        commentText: "已处理退房",
        disabledButton: true
      }
      break;
    case -1:
      temp = {
        text: "确认入住/取消入住",
        commentText: "确认入住",
        disabledButton: isCheckIn ? true : false
      }
      break;
    case 0:
    case 1:
      if (isCommented) {
        temp = {
          text: "已评价",
          commentText: "已评价",
          disabledButton: true
        }
      } else {
        temp.text = "待评价";
        temp.commentText = "立即评价"
      }
      break;
    default:
      break;
  }
  return temp;
}

// 校验手机号码是否格式正确
export function checkPhone(mobile: string): boolean {
  var phone = /^(((13[0-9]{1})|(15[0-9]{1})|(17[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
  if (mobile && mobile.length === 11) {
    if (phone.test(mobile)) {
      return true;
    }
  }
  return false;
}

// 校验表单是否有空，有空返回 false
export function checkEmpty(obj: any): boolean {
  let empty = null;
  for (const key in obj) {
    if (obj[key] === null || obj[key] === "") {
      empty = true;
      break;
    } else {
      empty = false;
    }
  }
  return empty;
}

// 身份证真实性验证
export function checkId(value) {
  var vcity = {
    11: "北京", 12: "天津", 13: "河北", 14: "山西", 15: "内蒙古",
    21: "辽宁", 22: "吉林", 23: "黑龙江", 31: "上海", 32: "江苏",
    33: "浙江", 34: "安徽", 35: "福建", 36: "江西", 37: "山东", 41: "河南",
    42: "湖北", 43: "湖南", 44: "广东", 45: "广西", 46: "海南", 50: "重庆",
    51: "四川", 52: "贵州", 53: "云南", 54: "西藏", 61: "陕西", 62: "甘肃",
    63: "青海", 64: "宁夏", 65: "新疆", 71: "台湾", 81: "香港", 82: "澳门", 91: "国外"
  };

  // 判断是否为空
  let isEmpty = function (card) {
    if (/^\s*$/.test(card) === true) {
      return true;
    }
  }
  //检查号码是否符合规范，包括长度，类型
  let isCardNo = function (card) {
    if (isEmpty(card)) {
      return true;
    }
    //这个代码表示身份证可以为空
    //身份证号码为15位或者18位，15位时全为数字，18位前17位为数字，最后一位是校验位，可能为数字或字符X
    var reg = /(^\d{15}$)|(^\d{17}(\d|X)$)/;
    if (reg.test(card) === false) {
      return false;
    }


    return true;
  };

  //取身份证前两位,校验省份
  let checkProvince = function (card) {
    if (isEmpty(card)) {
      return true;
    }
    var province = card.substr(0, 2);
    if (vcity[province] == undefined) {
      return false;
    }
    return true;
  };

  //检查生日是否正确
  let checkBirthday = function (card) {
    if (isEmpty(card)) {
      return true;
    }
    var len = card.length;
    //身份证15位时，次序为省（3位）市（3位）年（2位）月（2位）日（2位）校验位（3位），皆为数字
    if (len == '15') {
      var re_fifteen = /^(\d{6})(\d{2})(\d{2})(\d{2})(\d{3})$/;
      var arr_data = card.match(re_fifteen);
      var year = arr_data[2];
      var month = arr_data[3];
      var day = arr_data[4];
      var birthday = new Date('19' + year + '/' + month + '/' + day);
      return verifyBirthday('19' + year, month, day, birthday);
    }
    //身份证18位时，次序为省（3位）市（3位）年（4位）月（2位）日（2位）校验位（4位），校验位末尾可能为X
    if (len == '18') {
      var re_eighteen = /^(\d{6})(\d{4})(\d{2})(\d{2})(\d{3})([0-9]|X)$/;
      var arr_data = card.match(re_eighteen);
      var year = arr_data[2];
      var month = arr_data[3];
      var day = arr_data[4];
      var birthday = new Date(year + '/' + month + '/' + day);
      return verifyBirthday(year, month, day, birthday);
    }
    return false;
  };

  //校验日期
  let verifyBirthday = function (year, month, day, birthday) {
    var now = new Date();
    var now_year = now.getFullYear();
    //年月日是否合理
    if (birthday.getFullYear() == year && (birthday.getMonth() + 1) == month && birthday.getDate() == day) {
      //判断年份的范围（3岁到100岁之间)
      var time = now_year - year;
      if (time >= 3 && time <= 100) {
        return true;
      }
      return false;
    }
    return false;
  };

  //校验位的检测
  let checkParity = function (card) {
    if (isEmpty(card)) {
      return true;
    }
    //15位转18位
    card = changeFivteenToEighteen(card);
    var len = card.length;
    if (len == '18') {
      var arrInt = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2);
      var arrCh = new Array('1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2');
      var cardTemp = 0, i, valnum;
      for (i = 0; i < 17; i++) {
        cardTemp += card.substr(i, 1) * arrInt[i];
      }
      valnum = arrCh[cardTemp % 11];
      if (valnum == card.substr(17, 1)) {
        return true;
      }
      return false;
    }
    return false;
  };

  //15位转18位身份证号
  let changeFivteenToEighteen = function (card) {
    if (isEmpty(card)) {
      return true;
    }
    if (card.length == '15') {
      var arrInt = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2);
      var arrCh = new Array('1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2');
      var cardTemp = 0, i;
      card = card.substr(0, 6) + '19' + card.substr(6, card.length - 6);
      for (i = 0; i < 17; i++) {
        cardTemp += card.substr(i, 1) * arrInt[i];
      }
      card += arrCh[cardTemp % 11];
      return card;
    }
    return card;
  };

  //checkCard = function () {
  var card = value;
  //校验长度，类型
  if (isCardNo(card) === false) {
    //alert('您输入的身份证号码不正确，请重新输入');
    //document.getElementById('card_no').focus;
    return false;
  }
  //检查省份
  if (checkProvince(card) === false) {
    return false;
  }
  //校验生日
  if (checkBirthday(card) === false) {
    return false;
  }
  //检验位的检测
  if (checkParity(card) === false) {
    return false;
  }

  return true;
}

// 评价名格式化 混***王
export function formatName(name) {
  let newStr;
  if (name.length === 2) {
    newStr = name.substr(0, 1) + '*';
  } else if (name.length > 2) {
    let char = '';
    for (let i = 0, len = name.length - 2; i < len; i++) {
      char += '*';
    }
    newStr = name.substr(0, 1) + char + name.substr(-1, 1);
  } else {
    newStr = name;
  }

  return newStr;
}

// 判断是否为数字
export function isNumber(val) {
  var regPos = /^\d+(\.\d+)?$/; //非负浮点数
  var regNeg = /^(-(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*)))$/; //负浮点数
  if (regPos.test(val) || regNeg.test(val)) {
    return true;
  } else {
    return false;
  }
}

// 中文数字转阿拉伯数字
export function word2number(w) {
  var e = "零一二三四五六七八九";
  var ew = ["十", "百", "千"];
  var ej = ["万", "亿"];
  var rss = "^([" + e + ew.join("") + "]+" + ej[1] + ")?([" + e + ew.join("") + "]+" + ej[0] + ")?([" + e + ew.join("") + "]+)?$";
  //     ^([零一二三四五六七八九十百千]+亿)?([零一二三四五六七八九十百千]+万)?([零一二三四五六七八九十百千]+)?$
  var arr = new RegExp(rss).exec(w);
  function foh(str) {
    str = new String(str);
    var a = 0;
    if (str.indexOf(ew[0]) == 0) a = 10;
    str = str.replace(new RegExp(e.charAt(0), "g"), "");
    if (new RegExp("([" + e + "])$").test(str))
      a += e.indexOf(RegExp.$1);
    if (new RegExp("([" + e + "])" + ew[0]).test(str))
      a += e.indexOf(RegExp.$1) * 10;
    if (new RegExp("([" + e + "])" + ew[1]).test(str))
      a += e.indexOf(RegExp.$1) * 100;
    if (new RegExp("([" + e + "])" + ew[2]).test(str))
      a += e.indexOf(RegExp.$1) * 1000;
    return a;
  }
  return foh(arr[1]) * 100000000 + foh(arr[2]) * 10000 + foh(arr[3]);
}