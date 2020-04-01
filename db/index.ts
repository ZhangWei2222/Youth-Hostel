/*
 * @Description: node主文件--完成服务器连接和日志服务
 * @Author: Vivian
 * @Date: 2020-03-03 10:26:57
 * @LastEditTime: 2020-03-31 16:23:47
 */

const globalAny: any = global;
const path = require('path')
const Koa = require('koa2');
const app = new Koa();
const router = require('koa-router');
var cors = require('koa2-cors');
const bodyParser = require('koa-bodyparser');
const config = require('./config/default.ts');
const server = require('koa-static');
require('./lib/mysql.ts');

// // 设置静态文件
// app.use(server(
//   path.join(__dirname, '../dist')
// ))

// 设置跨域
app.use(cors({
  origin: function (ctx) { //设置允许来自指定域名请求
    globalAny.log.debug('看看地址' + JSON.stringify(ctx.request.header.referer));
    if (ctx.request.header.referer === "http://localhost:8080/") {
      return 'http://localhost:8080';
    } else {
      return 'http://101.133.132.172';
    }
  },
  maxAge: 5, //指定本次预检请求的有效期，单位为秒。
  credentials: true, //是否允许发送Cookie
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], //设置所允许的HTTP请求方法
  allowHeaders: ['Content-Type', 'Authorization', 'Accept'], //设置服务器支持的所有头信息字段
  exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'] //设置获取其他自定义字段
})
);

// ctx body 中间件
app.use(bodyParser({
  formLimit: '1mb'
}))

// 各路由
app.use(require('./routers/signUp.ts').routes()) // 注册
app.use(require('./routers/signIn.ts').routes()) // 登录
app.use(require('./routers/user.ts').routes()) // 用户相关
app.use(require('./routers/room.ts').routes()) // 房间相关
app.use(require('./routers/order.ts').routes()) // 订单相关
app.use(require('./routers/search.ts').routes()) // 搜索相关
app.use(require('./routers/admin.ts').routes()) // 店家系统相关

// 监听端口
app.listen(config.port, () => {
  console.log("——————————服务已启动——————————");
})

// 开启日志服务
const log4js = require("log4js");
const log4js_config = require("../logs/log_config.json");
log4js.configure(log4js_config);
globalAny.log = log4js.getLogger("wei");

globalAny.log.info('---开始listen in localhost:' + config.port);
export { };