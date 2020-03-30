/*
 * @Description: 连接mysql、执行sql语句-房间相关
 * @Author: Vivian
 * @Date: 2020-03-10 10:31:15
 * @LastEditTime: 2020-03-30 12:49:31
 */

const globalAny: any = global;
const mysql = require('mysql');
const config = require('../config/default.ts');
const { getSQLObject, _structureAnalysis } = require('../lib/dbtools.ts');

var pool = mysql.createPool(config.database);

const query = function (sql, val) {
  return new Promise((resolve, reject) => {
    pool.getConnection(function (err, connection) {
      if (err) {
        reject(err)
      } else {
        connection.query(sql, val, (err, res) => {
          if (err) {
            reject(err)
          } else {
            resolve(res)
          }
          connection.release();
        })
      }
    })
  })
}

const landlordRoomInfo_roomList = (val) => { // 获取房间列表
  let stru = getSQLObject();
  stru["query"] = "select";
  stru["tables"] = "roomList_view";
  stru["data"] = {
    "*": '*'
  };
  stru["where"]["condition"] = [
    "roomList_view.landlordId = " + val.landlordId,
  ];
  stru["options"]["order by"] = [
    "roomList_view.id"
  ];
  let result = _structureAnalysis(stru);
  globalAny.log.trace("[landlordRoomInfo_roomList] sql语句: " + result.sql + " value参数: " + result.value);
  return query(result.sql, result.value)
}

const landlordRoomInfo_dateFilter = (val) => { // 筛选日期
  let stru = getSQLObject();
  stru["query"] = "select";
  stru["tables"] = "orders,roomList_view ";
  stru["data"] = {
    "roomList_view.id": '*',
    "roomList_view.roommateNum": '*',
    "COUNT(roomList_view.id) AS searchGuestsNum": '*'
  };
  stru["where"]["condition"] = [
    `"${val.searchStartDate}" >= startDate `,
    `"${val.searchStartDate}" <= (startDate + INTERVAL days DAY -INTERVAL 90 minute ) `,
    `orders.roomId = roomList_view.id`,
    `orders.status = -1`
  ];
  let result = _structureAnalysis(stru);
  result.sql = result.sql.substring(0, result.sql.length - 1)
  result.sql += 'and ('
  val.roomIds.forEach((item, index) => {
    result.sql += `roomId = ${item} `
    if (index != val.roomIds.length - 1) {
      result.sql += `or `
    }
  })
  result.sql += ') GROUP BY roomList_view.id'
  globalAny.log.trace("[landlordRoomInfo_dateFilter] sql语句: " + result.sql + " value参数: " + result.value);
  return query(result.sql, result.value)
}

const landlordComments = (val) => { // 获取店家评论
  let stru = getSQLObject();
  stru["query"] = "select";
  stru["tables"] = "room_comments_view";
  stru["data"] = {
    "id": '*',
    "roomId": '*',
    "name": '*',
    "avator": '*',
    "message": '*',
    "date": '*',
    "score": '*',
  };
  stru["where"]["condition"] = [
    "landlordId = " + val,
  ];
  let result = _structureAnalysis(stru);
  globalAny.log.trace("[landlordComments] sql语句: " + result.sql + " value参数: " + result.value);
  return query(result.sql, result.value)
}

const landlordCommentsAVG = (val) => { // 获取店家评论平均数
  let stru = getSQLObject();
  stru["query"] = "select";
  stru["tables"] = "room_comments_view";
  stru["data"] = {
    "round((AVG(`administration-score`) + AVG(`hygiene-score`) + AVG(`communicate-score`) + AVG(`describe-score`))/4, 2) AS value": '*'
  };
  stru["where"]["condition"] = [
    "landlordId = " + val,
  ];
  let result = _structureAnalysis(stru);
  globalAny.log.trace("[landlordCommentsAVG] sql语句: " + result.sql + " value参数: " + result.value);
  return query(result.sql, result.value)
}

const roomDetail = (val) => { // 获取房间详情
  let stru = getSQLObject();
  stru["query"] = "select";
  stru["tables"] = "rooms,orders";
  stru["data"] = {
    "rooms.*": '*',
    "COUNT(orders.roomId) AS guestsNum": '*'
  }
  stru["where"]["condition"] = [
    "rooms.id = " + val.roomId,
    "rooms.id = orders.roomId",
    "orders.`status` = -1",
    `"${val.searchStartDate}" >= startDate `,
    `"${val.searchStartDate}" <= (startDate + INTERVAL days DAY -INTERVAL 90 minute ) `,
  ];
  // stru["options"]["group by"] = 'rooms.id';
  let result = _structureAnalysis(stru);
  globalAny.log.trace("[roomDetail] sql语句: " + result.sql + " value参数: " + result.value);
  return query(result.sql, result.value)
}

const houseDetail = (val) => { // 获取房源详情
  let stru = getSQLObject();
  stru["query"] = "select";
  stru["tables"] = "houses";
  stru["data"] = {
    "*": '*',
  };
  stru["where"]["condition"] = [
    "id = " + val,
  ];
  let result = _structureAnalysis(stru);
  globalAny.log.trace("[houseDetail] sql语句: " + result.sql + " value参数: " + result.value);
  return query(result.sql, result.value)
}

const landlordDetail = (val) => { // 获取店家信息
  let stru = getSQLObject();
  stru["query"] = "select";
  stru["tables"] = "landlords";
  stru["data"] = {
    "*": '*',
  };
  stru["where"]["condition"] = [
    "id = " + val,
  ];
  let result = _structureAnalysis(stru);
  globalAny.log.trace("[landlordDetail] sql语句: " + result.sql + " value参数: " + result.value);
  return query(result.sql, result.value)
}

const commentDetail = (val) => { // 获取房间评论
  let stru = getSQLObject();
  stru["query"] = "select";
  stru["tables"] = "room_comments_view";
  stru["data"] = {
    "*": '*'
  };
  stru["where"]["condition"] = [
    "roomId = " + val,
  ];
  let result = _structureAnalysis(stru);
  globalAny.log.trace("[commentDetail] sql语句: " + result.sql + " value参数: " + result.value);
  return query(result.sql, result.value)
}

const commentAVG = (val) => { // 获取房间评论平均数
  let stru = getSQLObject();
  stru["query"] = "select";
  stru["tables"] = "room_comments_view";
  stru["data"] = {
    "round(AVG(`administration-score`),2) AS a_s": '*',
    "round(AVG(`hygiene-score`),2) AS h_s": '*',
    "round(AVG(`communicate-score`),2) AS c_s": '*',
    "round(AVG(`describe-score`),2) AS d_s": '*',
    "round(AVG(`score`), 2) AS totalScore": '*'
  };
  stru["where"]["condition"] = [
    "roomId = " + val,
  ];
  let result = _structureAnalysis(stru);
  globalAny.log.trace("[commentAVG] sql语句: " + result.sql + " value参数: " + result.value);
  return query(result.sql, result.value)
}

const facilityList = (val) => { // 获取服务设施表
  let stru = getSQLObject();
  stru["query"] = "select";
  stru["tables"] = "facilityList";
  stru["data"] = {
    "*": '*',
  };
  stru["where"]["condition"] = [
    "houseId = " + val,
  ];
  let result = _structureAnalysis(stru);
  globalAny.log.trace("[facilityList] sql语句: " + result.sql + " value参数: " + result.value);
  return query(result.sql, result.value)
}

module.exports = {
  landlordRoomInfo_roomList,
  landlordRoomInfo_dateFilter,
  landlordComments,
  landlordCommentsAVG,
  roomDetail,
  houseDetail,
  landlordDetail,
  commentDetail,
  commentAVG,
  facilityList
}

export { };