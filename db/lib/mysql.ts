/*
 * @Description: 连接mysql、执行sql语句-用户相关
 * @Author: Vivian
 * @Date: 2020-03-03 10:26:57
 * @LastEditTime: 2020-04-01 11:38:14
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
          // globalAny.log.debug("[query] " + sql + val);
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

const findUser = (val) => { // 查找所有User
  let stru = getSQLObject();
  stru["query"] = "select";
  stru["tables"] = "users";
  stru["data"] = {
    "*": '*'
  };
  stru["where"]["condition"] = [
    "name = '" + val + "'",
  ];
  let result = _structureAnalysis(stru);
  globalAny.log.trace("[findUser] sql语句: " + result.sql + " value参数: " + result.value);
  return query(result.sql, result.value)
}

const findLandlord = (val) => { // 查找所有Landlord
  let stru = getSQLObject();
  stru["query"] = "select";
  stru["tables"] = "landlords";
  stru["data"] = {
    "*": '*'
  };
  stru["where"]["condition"] = [
    "name = '" + val + "'",
  ];
  let result = _structureAnalysis(stru);
  globalAny.log.trace("[findLandlord] sql语句: " + result.sql + " value参数: " + result.value);
  return query(result.sql, result.value)
}

const insetUser = (val) => { // 注册
  let stru = getSQLObject();
  stru["query"] = "insert";
  stru["tables"] = "users";
  stru["data"] = {
    "name": val.name,
    "password": val.password,
    "sex": val.sex,
    "bornDate": val.bornDate,
    "phoneNum": val.phoneNum,
    "schoolName": val.schoolName,
    "education": val.education,
    "graduationTime": val.graduationTime,
    "message": val.message
  };

  let result = _structureAnalysis(stru);
  globalAny.log.trace("[insetUser] sql语句: " + result.sql + " value参数: " + result.value);

  return query(result.sql, result.value)
}

const userInfo = (val) => { // 获取用户信息
  let stru = getSQLObject();
  stru["query"] = "select";
  stru["tables"] = "users";
  stru["data"] = {
    "*": '*'
  };
  stru["where"]["condition"] = [
    "id = " + val,
  ];
  let result = _structureAnalysis(stru);
  globalAny.log.trace("[userInfo] sql语句: " + result.sql + " value参数: " + result.value);
  return query(result.sql, result.value)
}

const editUserInfo = (val) => { // 修改用户信息
  let stru = getSQLObject();
  stru["query"] = "update";
  stru["tables"] = "users";
  stru["data"] = {
    "password": val.password,
    "phoneNum": val.phoneNum,
    "message": val.message
  };
  stru["where"]["condition"] = [
    "id = " + val.id,
  ];
  let result = _structureAnalysis(stru);
  globalAny.log.trace("[editUserInfo] sql语句: " + result.sql + " value参数: " + result.value);
  return query(result.sql, result.value)
}

const uploadUserAvator = (val) => { // 上传用户头像
  let stru = getSQLObject();
  stru["query"] = "update";
  stru["tables"] = "users";
  stru["data"] = {
    "avator": val.filename
  };
  stru["where"]["condition"] = [
    "id = " + val.id,
  ];
  let result = _structureAnalysis(stru);
  globalAny.log.trace("[uploadUserAvator] sql语句: " + result.sql + " value参数: " + result.value);
  return query(result.sql, result.value)
}

const userComments = (val) => { // 获取用户评论
  let stru = getSQLObject();
  stru["query"] = "select";
  stru["tables"] = "user_comments_view";
  stru["data"] = {
    "*": '*'
  };
  stru["where"]["condition"] = [
    "userId = " + val,
  ];
  let result = _structureAnalysis(stru);
  globalAny.log.trace("[userComments] sql语句: " + result.sql + " value参数: " + result.value);
  return query(result.sql, result.value)
}

const userCommentsAVG = (val) => { // 获取用户评论平均数
  let stru = getSQLObject();
  stru["query"] = "select";
  stru["tables"] = "user_comments_view";
  stru["data"] = {
    "round(AVG(`quality-score`),2) AS q_s": '*',
    "round(AVG(`hygiene-score`),2) AS h_s": '*',
    "round(AVG(`communicate-score`),2) AS c_s": '*',
    "round(AVG(`describe-score`),2) AS d_s": '*',
    "round((AVG(`quality-score`) + AVG(`hygiene-score`) + AVG(`communicate-score`) + AVG(`describe-score`))/4, 2) AS totalScore": '*'
  };
  stru["where"]["condition"] = [
    "userId = " + val,
  ];
  let result = _structureAnalysis(stru);
  globalAny.log.trace("[userCommentsAVG] sql语句: " + result.sql + " value参数: " + result.value);
  return query(result.sql, result.value)
}

module.exports = {
  //暴露方法
  findUser,
  findLandlord,
  insetUser,
  userInfo,
  editUserInfo,
  uploadUserAvator,
  userComments,
  userCommentsAVG
}

export { };