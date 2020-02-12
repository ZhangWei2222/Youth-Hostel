"use strict";
/* 引入express框架 */
const express = require("express");
const app = express();

/* 引入cors */
const cors = require("cors");
app.use(cors());

/* 引入body-parser */
const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);

/* 引入mysql */
const mysql = require("mysql");
const conn = mysql.createConnection({
  host: "101.133.132.172",
  user: "root",
  password: "123456",
  database: "hostel",
  multipleStatements: true
});
conn.connect();

/* 监听端口 */
app.listen(4444, () => {
  console.log("——————————服务已启动——————————");
});

app.get("/", (req, res) => {
  res.send('<p style="color:red">服务已启动</p>');
});

// 书本列表
app.get("/api/getTenant", (req, res) => {
  const sqlStr = "SELECT id FROM tenant";
  conn.query(sqlStr, (error, results) => {
    if (error)
      return res.json({
        code: -1,
        message: error
      });
    res.json({
      code: 10000,
      data: results
    });
  });
});
