/*
 * @Description: 连接mysql、执行sql语句-搜索相关
 * @Author: Vivian
 * @Date: 2020-03-24 09:37:39
 * @LastEditTime: 2020-03-24 17:43:45
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

const orderList = (val) => { // 获取房间列表
  let stru = getSQLObject();
  stru["query"] = "select";
  stru["tables"] = "roomList_view";
  stru["data"] = {
    "*": '*'
  };
  switch (val.type) {
    case 'all':
      stru["options"]["order by"] = [
        "id"
      ];
      break;
    case 'score':
      stru["options"]["order by"] = [
        "score desc"
      ];
      break;
    case 'price':
      let priceContent = JSON.parse(val.filter)
      let priceSql
      if (priceContent.min !== -1) {
        globalAny.log.debug(priceContent.min, priceContent.max);
        if (priceContent.min) {
          priceSql = `price >= ${priceContent.min}`
          if (priceContent.max) {
            priceSql += ` and price <= ${priceContent.max}`
          }
          stru["where"]["condition"].push(priceSql);
        } else if (priceContent.max) {
          priceSql = `price <= ${priceContent.max}`
          stru["where"]["condition"].push(priceSql);
        }
      }
      stru["options"]["order by"] = [
        "price desc"
      ];
      break;
    case 'filter':
      let content = JSON.parse(val.filter)
      let sexSql, toiltSql, roommateSql
      if (content.sex) {
        sexSql = 'sex = ' + content.sex
        stru["where"]["condition"].push(sexSql);
      }
      if (content.roommate) {
        switch (content.roommate) {
          case '0':
            roommateSql = 'roommateNum > 0 and roommateNum < 3'
            break;
          case '1':
            roommateSql = 'roommateNum > 2 and roommateNum < 5'
            break;
          case '2':
            roommateSql = 'roommateNum > 4 and roommateNum < 7'
            break;
          case '3':
            roommateSql = 'roommateNum > 6'
            break;
          default:
            break;
        }
        stru["where"]["condition"].push(roommateSql);
      }
      if (content.toilet) {
        toiltSql = 'toiletNum = ' + content.toilet
        stru["where"]["condition"].push(toiltSql);
      }
      break;
    default:
      break;
  }
  let result = _structureAnalysis(stru);
  globalAny.log.trace("[orderList] sql语句: " + result.sql + " value参数: " + result.value);
  return query(result.sql, result.value)
}

const facilityFilter = (val) => { // 筛选便利设施
  let stru = getSQLObject();
  stru["query"] = "select";
  stru["tables"] = "facilityList,roomList_view";
  stru["data"] = {
    "roomList_view.*": '*'
  };
  stru["where"]["condition"] = [
    "facilityList.houseId = roomList_view.houseId"
  ];
  val.content.forEach((item) => {
    stru["where"]["condition"].push(`facilityList.${item} = 1`)
  })
  let result = _structureAnalysis(stru);
  result.sql = result.sql.substring(0, result.sql.length - 1)
  result.sql += 'and ('
  val.roomIds.forEach((item, index) => {
    result.sql += `roomList_view.id = ${item} `
    if (index != val.roomIds.length - 1) {
      result.sql += `or `
    }
  })
  result.sql += ') GROUP BY roomList_view.id'
  globalAny.log.trace("[facilityFilter] sql语句: " + result.sql + " value参数: " + result.value);
  return query(result.sql, result.value)
}

module.exports = {
  orderList,
  facilityFilter
}

export { };