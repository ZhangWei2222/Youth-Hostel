/*
 * @Description: 服务器配置
 * @Author: Vivian
 * @Date: 2020-03-03 10:26:57
 * @LastEditTime: 2020-04-23 11:27:21
 */

module.exports = {  // mysql 配置
  database: {
    host: '101.133.132.172', // 地址
    user: 'root', // 用户账号
    password: '123456', // 密码
    database: 'youth_hostel', // test库
    multipleStatements: true
  },
  port: 4442 // 监听端口
}
