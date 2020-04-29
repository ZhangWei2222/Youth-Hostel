<!--
 * @Description:
 * @Author: Vivian
 * @Date: 2020-02-11 16:25:52
 * @LastEditTime: 2020-04-29 18:53:47
 -->
# youth_hostel

毕业项目：青年旅社移动端
IP地址：http://101.133.132.172/#/home

## 使用

``` bash
# 下载依赖
npm install # 后端依赖
cd ./client npm install # 前端依赖

# 同时运行前后端项目
npm run dev

# 打包前端项目
cd ./client
npm run build

# 只运行前端项目
npm run client

# 只运行后端项目
npm run server
```

## 目录介绍

Youth-Hostel
├── client        // 前端 Vue 工程
│   ├── build
│   ├── config
│   ├── dist
│   ├── etc
│   ├── index.html
│   ├── package-lock.json
│   ├── package.json
│   ├── src
│   │   ├── App.vue
│   │   ├── assets
│   │   ├── common       // 公共文件
│   │   │   ├── images
│   │   │   ├── style
│   │   │   │   ├── ResetVant.less    // 自定义 Vant 主题样式
│   │   │   │   └── Variable.less     // 定义样式变量：颜色、字体大小
│   │   │   └── ts
│   │   │   │   ├── facility.ts   // 处理便利设施的方法
│   │   │   │   └── utill.ts      // 通用工具类
│   │   ├── components   // 组件
│   │   │   ├── AdminList.vue
│   │   │   ├── CommentList.vue
│   │   │   ├── CommentRate.vue
│   │   │   ├── FacilityList.vue
│   │   │   ├── Notice.vue
│   │   │   ├── OrderList.vue
│   │   │   ├── RoomList.vue
│   │   │   └── UserForm.vue
│   │   ├── main.ts     // 入口文件
│   │   ├── router      // 路由
│   │   │   └── index.ts
│   │   ├── services    // 定义API
│   │   │   ├── adminAPI.ts
│   │   │   ├── lib
│   │   │   │   └── http.ts   // 对 axios 设置 request 拦截器和 response 拦截器
│   │   │   ├── loginAPI.ts
│   │   │   ├── orderAPI.ts
│   │   │   ├── roomAPI.ts
│   │   │   ├── searchAPI.ts
│   │   │   └── userAPI.ts
│   │   ├── store       // Vuex 配置
│   │   │   └── index.ts
│   │   ├── views       // 页面
│   │   │   ├── admin
│   │   │   ├── HomePage.vue
│   │   │   ├── login
│   │   │   ├── order
│   │   │   ├── owner
│   │   │   ├── room
│   │   │   └── search
│   │   └── vue-shim.d.ts
│   ├── static
│   ├── tsconfig.json
│   ├── tslint.json
│   └── vue.config.ts
├── db                  // 后端 Node 工程
│   ├── config
│   │   └── default.ts       // 数据库配置文件
│   ├── index.ts        // 入口文件
│   ├── lib             // 封装各 sql 语句， 连接 MySQL
│   │   ├── dbtools.ts       // sql组装模块
│   │   ├── mysql-admin.ts   // 店家相关 sql 语句
│   │   ├── mysql-order.ts   // 订单相关
│   │   ├── mysql-room.ts    // 房间相关
│   │   ├── mysql-search.ts  // 查询相关
│   │   └── mysql.ts         // 房客相关（包括登录、注册）
│   ├── routers         // 路由，调用并执行在 lib 中对应的方法
│   │   ├── admin.ts         // 店家相关
│   │   ├── order.ts         // 订单相关
│   │   ├── room.ts          // 房间相关
│   │   ├── search.ts        // 搜索相关
│   │   ├── signIn.ts        // 登录相关
│   │   ├── signUp.ts        // 注册相关
│   │   └── user.ts          // 房客相关
│   └── token
│       ├── checkToken.ts    // 检查token
│       └── createToken.ts   // 创建token
├── logs                // 分类别、按时间存放后端日志
│   ├── debug
│   ├── error
│   ├── info
│   │   ├── info_file.2020-03-02.log
│   │   ├── ...
│   │   └── info_file.2020-04-23.log
│   ├── log_config.json      // log4js 配置文件
│   └── trace
├── package-lock.json
├── package.json
├── public
└── README.md
