/*
 * @Description: 连接mysql、执行sql语句-房间相关
 * @Author: Vivian
 * @Date: 2020-03-10 10:31:15
 * @LastEditTime: 2020-03-11 16:31:43
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

const landlordInfo = (val) => { // 获取店家信息
  let stru = getSQLObject();
  stru["query"] = "select";
  stru["tables"] = "room_comments_view,rooms";
  stru["data"] = {
    "rooms.id": '*',
    "rooms.roomName": '*',
    "rooms.price": '*',
    "rooms.roommateNum": '*',
    "rooms.guestsNum": '*',
    "rooms.toiletNum": '*',
    "avg(room_comments_view.score) AS score": '*',
    "COUNT(room_comments_view.score) AS commentsNum": '*',
  };
  stru["where"]["condition"] = [
    "rooms.landlordId = " + val,
    "room_comments_view.roomId= " + "rooms.id"
  ];
  stru["options"]["group by"] = "rooms.id"
  let result = _structureAnalysis(stru);
  globalAny.log.trace("[landlordInfo] sql语句: " + result.sql + " value参数: " + result.value);
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
  stru["tables"] = "rooms";
  stru["data"] = {
    "*": '*',
  };
  stru["where"]["condition"] = [
    "id = " + val,
  ];
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

const landlordDetail = (val) => { // 获取房源详情
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
    "round((AVG(`administration-score`) + AVG(`hygiene-score`) + AVG(`communicate-score`) + AVG(`describe-score`))/4, 2) AS totalScore": '*'
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
  landlordInfo,
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