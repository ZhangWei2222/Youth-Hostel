/*
 * @Description: 服务器配置
 * @Author: Vivian
 * @Date: 2020-03-03 10:26:57
 * @LastEditTime: 2020-04-29 16:35:56
 */

module.exports = {  // mysql 配置
  database: {
    host: '101.133.132.172', // 服务器ip地址
    user: 'root', // 用户账号
    password: '123456', // 密码
    database: 'youth_hostel', // 数据库名
    multipleStatements: true // 允许每个mysql语句有多条查询.使用它时要非常注意，因为它很容易引起sql注入攻击(默认:false)
  },
  port: 4442 // 监听端口
}
