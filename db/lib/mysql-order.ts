/*
 * @Description: 连接mysql、执行sql语句-订单相关
 * @Author: Vivian
 * @Date: 2020-03-11 16:31:25
 * @LastEditTime: 2020-03-16 12:51:01
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
const orderList = (val) => { // 获取订单列表 0:全部，1:有效，-1:无效
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
  };
  stru["where"]["condition"] = [
    "userId = " + val.userId
  ];
  if (val.type === 1) {
    stru["where"]["condition"].push("status != -3")
  } else if (val.type === -1) {
    stru["where"]["condition"].push("status = -3")
  }

  let result = _structureAnalysis(stru);
  globalAny.log.trace("[orderList] sql语句: " + result.sql + " value参数: " + result.value);
  return query(result.sql, result.value)
}

const sumbitRoomInfo = (val) => { // 获取下订单时候的房间信息
  let stru = getSQLObject();
  stru["query"] = "select";
  stru["tables"] = "rooms,houses";
  stru["data"] = {
    "rooms.id": '*',
    "rooms.roomName": '*',
    "houses.houseName": '*',
    "rooms.roommateNum": '*',
    "rooms.toiletNum": '*',
    "rooms.price": '*',
    "rooms.sex": '*',
  };
  stru["where"]["condition"] = [
    "rooms.id = " + val,
    "rooms.houseId = " + "houses.id"
  ];
  let result = _structureAnalysis(stru);
  globalAny.log.trace("[sumbitRoomInfo] sql语句: " + result.sql + " value参数: " + result.value);
  return query(result.sql, result.value)
}

const orderDetail = (val) => { // 获取订单信息
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
    "name": "*",
    "roommateNum": '*',
    "toiletNum": '*',
    "allPrice": '*',
    "loandlordPhone": '*',
  };
  stru["where"]["condition"] = [
    "id = " + val
  ];
  let result = _structureAnalysis(stru);
  globalAny.log.trace("[orderDetail] sql语句: " + result.sql + " value参数: " + result.value);
  return query(result.sql, result.value)
}

const insetOrder = (val) => { // 下订单
  let stru = getSQLObject();
  stru["query"] = "insert";
  stru["tables"] = "orders";
  stru["data"] = {
    "value": val.key,
    "roomId": val.roomId,
    "startDate": val.startDate,
    "days": val.days,
    "orderTime": val.orderTime,
    "userId": val.userId,
    "idCard": val.idCard,
    "phoneNum": val.phoneNum,
    "userName": val.userName,
    "message": val.message
  };

  let result = _structureAnalysis(stru);
  globalAny.log.trace("[insetOrder] sql语句: " + result.sql + " value参数: " + result.value);

  return query(result.sql, result.value)
}

const setGuestsNum = (val) => { // 调整可住人数
  let sql = `SELECT set_guestsNum(${val.roomId}, ${val.type})`
  globalAny.log.trace("[insetOrder] sql语句: " + sql + " value参数: " + val);

  return query(sql, val)
}

const changeOrderStatus = (val) => { // 修改订单状态
  let sql = `CALL set_orderStatus(${val.orderId}, ${val.status})`
  globalAny.log.trace("[changeOrderStatus] sql语句: " + sql + " value参数: " + val);

  return query(sql, val)
}

const deleteOrder = (val) => { // 删除订单
  let stru = getSQLObject();
  stru["query"] = "delete";
  stru["tables"] = "orders";
  stru["where"]["condition"] = [
    'id = ' + val.orderId
  ];
  let result = _structureAnalysis(stru);
  globalAny.log.trace("[deleteOrder] sql语句: " + result.sql + " value参数: " + result.value);

  return query("SET foreign_key_checks = 0;" + result.sql + "SET foreign_key_checks = 1;", result.value)
}

const orderComments = (val) => { // 添加订单评论
  let stru = getSQLObject();
  stru["query"] = "insert";
  stru["tables"] = "roomComments";
  stru["data"] = {
    "roomId": val.roomId,
    "userId": val.userId,
    "orderId": val.orderId,
    "message": val.message,
    "`describe-score`": val.describeScore,
    "`communicate-score`": val.communicateScore,
    "`hygiene-score`": val.hygieneScore,
    "`administration-score`": val.administrationScore,
  };

  let result = _structureAnalysis(stru);
  globalAny.log.trace("[orderComments] sql语句: " + result.sql + " value参数: " + result.value);

  return query(result.sql, result.value)
}

module.exports = {
  orderList,
  sumbitRoomInfo,
  orderDetail,
  insetOrder,
  setGuestsNum,
  changeOrderStatus,
  deleteOrder,
  orderComments
}

export { };