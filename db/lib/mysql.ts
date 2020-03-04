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


// const createTable = (sql) => {
//   query(sql, [])
// }

// const usersTable = `CREATE TABLE IF NOT EXISTS users (
//    id VARCHAR(36) NOT NULL,
//    userName VARCHAR(16) NOT NULL,
//    passWord VARCHAR(16) NOT NULL,
//    avator VARCHAR(50) NOT NULL,
//    createTime VARCHAR(50) NOT NULL,
//    PRIMARY KEY (id)
// )`;

// const postsTable = `CREATE TABLE IF NOT EXISTS posts (
//    id INT NOT NULL AUTO_INCREMENT,
//    userName VARCHAR(100) NOT NULL,
//    userId VARCHAR(40) NOT NULL,
//    avator VARCHAR(100) NOT NULL,
//    title VARCHAR(100) NOT NULL,
//    content TEXT(0) NOT NULL,
//    hot VARCHAR(40) NOT NULL,
//    comments VARCHAR(40) NOT NULL,
//    createTime VARCHAR(100) NOT NULL,
//    PRIMARY KEY (id)
// )`;

// const commentTable = `CREATE TABLE IF NOT EXISTS comment (
//    id INT NOT NULL AUTO_INCREMENT,
//    userName VARCHAR(100) NOT NULL,
//    content TEXT(0) NOT NULL,
//    postId VARCHAR(40) NOT NULL,
//    avator VARCHAR(100) NOT NULL,
//    createTime VARCHAR(100) NOT NULL,
//    PRIMARY KEY (id)
// )`;


// // 建表
// createTable(usersTable) // 用户表
// createTable(postsTable) // 文章表
// createTable(commentTable) // 评论表



// const findUser = (val) => { // 查找所有User
//   let _sql = `SELECT * FROM users WHERE userName = '${val}'`
//   return query(_sql, val)
// }

// const createPosts = (val) => { // 新建posts
//   let _sql = `INSERT INTO posts (userName, userId, avator, title, content, hot, comments, createTime) VALUES (?,?,?,?,?,?,?,?)`
//   return query(_sql, val)
// }

// const updatePosts = (val) => { // 修改posts
//   let _sql = `UPDATE posts SET title=?, content=? WHERE id=?`
//   return query(_sql, val)
// }

// const updatePostsComment = (val) => { // 修改posts评论数量
//   let _sql = `UPDATE posts SET comments=? WHERE id=?`
//   return query(_sql, val)
// }

// const updatePostsHot = (val) => { // 修改posts查看人数
//   let _sql = `UPDATE posts SET hot=? WHERE id=?`
//   return q

module.exports = {
  //暴露方法
  findUser,
  insetUser,
  userInfo,
  editUserInfo
}

export { };