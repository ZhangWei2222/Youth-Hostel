/*
 * @Description: 连接mysql、执行sql语句-订单相关
 * @Author: Vivian
 * @Date: 2020-03-11 16:31:25
 * @LastEditTime: 2020-03-11 17:05:42
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

const orderDetail = (val) => { // 获取订单信息
  let stru = getSQLObject();
  stru["query"] = "select";
  stru["tables"] = "orders,rooms,houses,landlords";
  stru["data"] = {
    "orders.id": '*',
    "orders.startDate": '*',
    "orders.days": '*',
    "orders.orderTime": '*',
    "orders.phoneNum": '*',
    "orders.userName": '*',
    "orders.message": '*',
    "orders.`status`": '*',
    "rooms.roomName": '*',
    "houses.houseName": '*',
    "rooms.roommateNum": '*',
    "rooms.toiletNum": '*',
    "rooms.price": '*',
    "rooms.sex": '*',
    "landlords.phoneNum AS loandlordPhone": '*',
  };
  stru["where"]["condition"] = [
    "orders.userId =" + val,
    "orders.roomId =" + "rooms.id",
    "rooms.houseId= " + "houses.id",
    "rooms.landlordId= " + "landlords.id",
  ];
  let result = _structureAnalysis(stru);
  globalAny.log.trace("[orderDetail] sql语句: " + result.sql + " value参数: " + result.value);
  return query(result.sql, result.value)
}


module.exports = {
  orderDetail
}

export { };