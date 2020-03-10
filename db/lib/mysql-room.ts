/*
 * @Description: 连接mysql、执行sql语句-房间相关
 * @Author: Vivian
 * @Date: 2020-03-10 10:31:15
 * @LastEditTime: 2020-03-10 11:29:28
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

const landlordComments = (val) => { // 获取店家评论
  let stru = getSQLObject();
  stru["query"] = "select";
  stru["tables"] = "landlord_comments_view";
  stru["data"] = {
    "*": '*'
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
  stru["tables"] = "landlord_comments_view";
  stru["data"] = {
    "round(AVG(`administration-score`),2) AS a_s": '*',
    "round(AVG(`hygiene-score`),2) AS h_s": '*',
    "round(AVG(`communicate-score`),2) AS c_s": '*',
    "round(AVG(`describe-score`),2) AS d_s": '*',
    "round((AVG(`administration-score`) + AVG(`hygiene-score`) + AVG(`communicate-score`) + AVG(`describe-score`))/4, 2) AS totalScore": '*'
  };
  stru["where"]["condition"] = [
    "landlordId = " + val,
  ];
  let result = _structureAnalysis(stru);
  globalAny.log.trace("[landlordCommentsAVG] sql语句: " + result.sql + " value参数: " + result.value);
  return query(result.sql, result.value)
}

module.exports = {
  landlordComments,
  landlordCommentsAVG
}

export { };