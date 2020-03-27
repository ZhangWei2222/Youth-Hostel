/*
 * @Description: 连接mysql、执行sql语句-搜索相关
 * @Author: Vivian
 * @Date: 2020-03-24 09:37:39
 * @LastEditTime: 2020-03-27 11:23:15
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

const roomList = (val) => { // 获取房间列表
  let stru = getSQLObject();
  // stru["query"] = "select";
  // stru["tables"] = "roomList_view,orders ";
  // stru["data"] = {
  //   "roomList_view.*": '*',
  //   "COUNT(orders.roomId) AS guestsNum": '*',
  // };
  // stru["where"]["condition"] = [
  //   "roomList_view.id = orders.roomId",
  //   " (orders.`status` = -1 OR (orders.`status` = 0 AND NOW() < (orders.startDate + INTERVAL orders.days DAY) )   )"
  // ];
  // stru["options"]["group by"] = [
  //   "roomList_view.id"
  // ];
  stru["query"] = "select";
  stru["tables"] = "roomList_view";
  stru["data"] = {
    "*": '*'
  };

  // 按分类获取
  switch (val.type) {
    case 'all':
      stru["options"]["order by"] = [
        "roomList_view.id"
      ];
      break;
    case 'search':
      if (JSON.parse(val.searchFilter).sex) {
        stru["where"]["condition"].push(`sex = ${JSON.parse(val.searchFilter).sex}`);
      }
      if (JSON.parse(val.searchFilter).location) {
        stru["where"]["condition"].push(`houseLocation = '${JSON.parse(val.searchFilter).location}'`);
      }
      if (JSON.parse(val.searchFilter).houseName) {
        stru["where"]["condition"].push(`houseName like '%${JSON.parse(val.searchFilter).houseName}%'`);
      }
      stru["options"]["order by"] = [
        "roomList_view.id"
      ];
      break;
    default:
      break;
  }

  // 默认 好评 价格排序
  if (JSON.parse(val.filter).sortType) {
    switch (JSON.parse(val.filter).sortType) {
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
        stru["options"]["order by"] = [
          "price"
        ];
        break;
      default:
        break;
    }
  }

  // 筛选价格
  if (JSON.parse(val.filter).price.min !== -1 || JSON.parse(val.filter).price.max !== -1) {
    let priceContent = JSON.parse(val.filter).price
    let priceSql
    if (priceContent.min !== -1) {
      priceSql = `price >= ${priceContent.min}`
      if (priceContent.max !== -1) {
        priceSql += ` and price <= ${priceContent.max}`
      }
      stru["where"]["condition"].push(priceSql);
    } else if (priceContent.max !== -1) {
      priceSql = `price <= ${priceContent.max}`
      stru["where"]["condition"].push(priceSql);
    }
  }

  //筛选更细致
  if (JSON.parse(val.filter).filter) {
    let content = JSON.parse(val.filter).filter
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

const dateFilter = (val) => { // 筛选日期
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
  globalAny.log.trace("[dateFilter] sql语句: " + result.sql + " value参数: " + result.value);
  return query(result.sql, result.value)
}

const locationListAPI = (val) => { // 获取城市列表
  let stru = getSQLObject();
  stru["query"] = "select";
  stru["tables"] = "db_yhm_city";
  stru["data"] = {
    "class_name": '*'
  };
  let result = _structureAnalysis(stru);
  globalAny.log.trace("[locationListAPI] sql语句: " + result.sql + " value参数: " + result.value);
  return query(result.sql, result.value)
}

module.exports = {
  roomList,
  facilityFilter,
  locationListAPI,
  dateFilter
}

export { };