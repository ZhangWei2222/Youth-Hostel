/*
 * @Description: 连接mysql、执行sql语句-订单相关
 * @Author: Vivian
 * @Date: 2020-03-11 16:31:25
 * @LastEditTime: 2020-03-12 18:20:31
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
  stru["tables"] = "orders,rooms,houses,landlords";
  stru["data"] = {
    "orders.id": '*',
    "orders.value": '*',
    "orders.startDate": '*',
    "orders.days": '*',
    "orders.orderTime": '*',
    "orders.phoneNum": '*',
    "orders.userName": '*',
    "orders.message": '*',
    "orders.`status`": '*',
    "orders.roomId": '*',
    "rooms.roomName": '*',
    "houses.houseName": '*',
    "rooms.roommateNum": '*',
    "rooms.toiletNum": '*',
    "rooms.price": '*',
    "rooms.sex": '*',
    "landlords.phoneNum AS loandlordPhone": '*',
  };
  stru["where"]["condition"] = [
    "orders.id = " + val,
    "orders.roomId =" + "rooms.id",
    "rooms.houseId= " + "houses.id",
    "rooms.landlordId= " + "landlords.id",
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

const checkOutOrder = (val) => { // 退房
  let sql = `CALL set_orderStatus(${val.orderId}, ${val.status})`
  globalAny.log.trace("[checkOutOrder] sql语句: " + sql + " value参数: " + val);

  return query(sql, val)
}

const deleteOrder = (val) => { // 下订单
  let stru = getSQLObject();
  stru["query"] = "delete";
  stru["tables"] = "orders";
  stru["where"]["condition"] = [
    'id = ' + val.orderId
  ];
  let result = _structureAnalysis(stru);
  globalAny.log.trace("[deleteOrder] sql语句: " + result.sql + " value参数: " + result.value);

  return query(result.sql, result.value)
}

module.exports = {
  sumbitRoomInfo,
  orderDetail,
  insetOrder,
  setGuestsNum,
  checkOutOrder,
  deleteOrder
}

export { };