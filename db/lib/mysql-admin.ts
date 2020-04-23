/*
 * @Description:
 * @Author: Vivian
 * @Date: 2020-03-31 16:23:11
 * @LastEditTime: 2020-04-23 17:30:04
 */
/*
 * @Description: 连接mysql、执行sql语句-用户相关
 * @Author: Vivian
 * @Date: 2020-03-03 10:26:57
 * @LastEditTime: 2020-03-31 16:04:53
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

const adminInfo = (val) => { // 获取店家信息
  let stru = getSQLObject();
  stru["query"] = "select";
  stru["tables"] = "landlords";
  stru["data"] = {
    "*": '*'
  };
  stru["where"]["condition"] = [
    "id = " + val,
  ];
  let result = _structureAnalysis(stru);
  globalAny.log.trace("[adminInfo] sql语句: " + result.sql + " value参数: " + result.value);
  return query(result.sql, result.value)
}

const adminList = (val) => { // 获取订单列表
  let stru = getSQLObject();
  stru["query"] = "select";
  stru["tables"] = "orders_view";
  stru["data"] = {
    "id": '*',
    "name": '*',
    "startDate": '*',
    "days": '*',
    "`status`": '*',
    "allPrice": '*',
    "roomId": "*",
    // "houseId": "*",
    "userAvator": "*",
    "userName": "*",
    "userId": "*",
  };
  stru["where"]["condition"] = [
    "landlordId = " + val.landlordId
  ];
  stru["options"]["order by"] = 'orders_view.orderTime';
  let result = _structureAnalysis(stru);
  globalAny.log.trace("[adminList] sql语句: " + result.sql + " value参数: " + result.value);
  return query(result.sql, result.value)
}

const findComments = (val) => { // 获取订单列表
  let stru = getSQLObject();
  stru["query"] = "select";
  stru["tables"] = "userComments,orders_view";
  stru["data"] = {
    "userComments.id": '*'
  };
  stru["where"]["condition"] = [
    "orders_view.id = " + val,
    "userComments.orderId = orders_view.id"
  ];
  let result = _structureAnalysis(stru);
  globalAny.log.trace("[findComments] sql语句: " + result.sql + " value参数: " + result.value);
  return query(result.sql, result.value)
}

const adminDetail = (val) => { // 获取订单信息
  let stru = getSQLObject();
  stru["query"] = "select";
  stru["tables"] = "orders_view";
  stru["data"] = {
    "id": '*',
    "value": '*',
    "startDate": '*',
    "days": '*',
    "orderTime": '*',
    "phoneNum": '*',
    "userName": '*',
    "message": '*',
    "`status`": '*',
    "roomId": '*',
    "houseId": "*",
    "landlordId": "*",
    "userId": "*",
    "name": "*",
    "roommateNum": '*',
    "toiletNum": '*',
    "allPrice": '*', "orderName": '*'
  };
  stru["where"]["condition"] = [
    "id = " + val
  ];
  let result = _structureAnalysis(stru);
  globalAny.log.trace("[adminDetail] sql语句: " + result.sql + " value参数: " + result.value);
  return query(result.sql, result.value)
}

const refuseOrder = (val) => { // 取消订单
  let stru = getSQLObject();
  stru["query"] = "update";
  stru["tables"] = "orders";
  stru["data"] = {
    "refuseReason": val.refuseReason
  };
  stru["where"]["condition"] = [
    "id = " + val.orderId,
  ];
  let result = _structureAnalysis(stru);
  result.sql += `call set_orderStatus(${val.orderId}, -3)`
  globalAny.log.trace("[refuseOrder] sql语句: " + result.sql + " value参数: " + result.value);
  return query(result.sql, result.value)
}

const checkInOrder = (val) => { // 确认入住
  let sql = `call set_checkIn(${val});`
  globalAny.log.trace("[checkInOrder] sql语句: " + sql + " value参数: " + val);
  return query(sql, val)
}

const userComments = (val) => { // 添加房客评论
  let stru = getSQLObject();
  stru["query"] = "insert";
  stru["tables"] = "userComments";
  stru["data"] = {
    "landlordId": val.landlordId,
    "userId": val.userId,
    "orderId": val.orderId,
    "message": val.message,
    "`describe-score`": val.describeScore,
    "`communicate-score`": val.communicateScore,
    "`hygiene-score`": val.hygieneScore,
    "`quality-score`": val.qualityScore,
  };

  let result = _structureAnalysis(stru);
  globalAny.log.trace("[userComments] sql语句: " + result.sql + " value参数: " + result.value);

  return query(result.sql, result.value)
}

const landlordcheckOutOrder = (val) => { // 确认退房
  let sql = `CALL set_orderStatus(${val.orderId}, ${val.status})`
  globalAny.log.trace("[landlordcheckOutOrder] sql语句: " + sql + " value参数: " + val);

  return query(sql, val)
}

module.exports = {
  adminInfo,
  adminList,
  findComments,
  adminDetail,
  refuseOrder,
  checkInOrder,
  userComments,
  landlordcheckOutOrder
}

export { };