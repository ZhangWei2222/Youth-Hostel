const globalAny: any = global;
const path = require('path')
const Koa = require('koa2');
const app = new Koa();
const router = require('koa-router');
var cors = require('koa-cors');
const bodyParser = require('koa-bodyparser');
const config = require('./config/default.ts');
const server = require('koa-static');
const jwt = require('jsonwebtoken');

require('./lib/mysql.ts');



app.use(server(
  path.join(__dirname, './public')
)) // 设置静态文件

app.use(cors({
  origin: 'http://localhost:8080',  // 允许 loclhost:8080 访问
  exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
  maxAge: 5,
  credentials: true,
  allowMethods: ['GET', 'POST'],
  allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
})
); // 设置跨域

app.use(bodyParser({
  formLimit: '1mb'
})) // ctx body 中间件

app.use(require('./routers/user.ts').routes())

app.use(require('./routers/signUp.ts').routes()) // 注册
app.use(require('./routers/signIn.ts').routes()) // 登录

// app.use(require('./routers/createPosts.js').routes()) // 新建文章
// app.use(require('./routers/postsList.js').routes()) // 搜索文章
// app.use(require('./routers/postDetail.js').routes()) // 文章detail
// app.use(require('./routers/updatePosts.js').routes()) // 修改文章

// app.use(require('./routers/createComment.js').routes()) // 添加留言
// app.use(require('./routers/commentList.js').routes()) // 获取留言


app.listen(config.port, () => {
  console.log("——————————服务已启动——————————");
}) // 监听端口

app.use(async (ctx, next) => {
  ctx.set('Access-Control-Allow-Origin', '*');
  ctx.set('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
  ctx.set('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
});

//log
const log4js = require("log4js");
const log4js_config = require("../logs/log_config.json");
log4js.configure(log4js_config);
globalAny.log = log4js.getLogger("wei");

globalAny.log.info('---开始listen in localhost:' + config.port);

export { };