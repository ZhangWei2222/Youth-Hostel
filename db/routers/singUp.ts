const globalAny: any = global;
let router = require('koa-router')();
const uuidV1 = require('uuid/v1'); // 生成13位 userId
const userModel = require('../lib/mysql.ts');
const fs = require('fs'); // 文件操作



router.get('/api/getTenant', async (ctx, next) => {
  await userModel.findUser().then((res) => {
    ctx.body = {
      state: 1,
      msg: '用户登录成功!',
      data: res
    }
  }).catch((err) => {
    globalAny.log.error(err);
    ctx.body = {
      state: 0,
      msg: err,
      data: []
    }
  })
})

// 注册
router.post('/api/signUp', async (ctx, next) => {

  // post请求 从body中获取注册参数
  let user = {
    name: ctx.request.body.name,
    password: ctx.request.body.password,
    sex: ctx.request.body.sex,
    bornDate: ctx.request.body.bornDate + "-01",
    phoneNum: ctx.request.body.phoneNum,
    schoolName: ctx.request.body.schoolName,
    education: ctx.request.body.education,
    graduationTime: ctx.request.body.graduationTime + "-01",
    message: ctx.request.body.message
  }

  await userModel.findUser(user.name).then(async (res) => {
    if (res.length) { // length > 1 说明 表中有数据
      globalAny.log.error("[insetUser] 注册失败: 用户已存在！");
      ctx.body = {
        code: -2,
        msg: '用户已存在!',
        data: []
      }
    } else {  // 否者没有注册
      await userModel.insetUser(user).then((res) => {
        globalAny.log.trace("[insetUser] 注册成功");
        ctx.body = {
          code: 0,
          msg: '注册成功',
          data: res
        }
      }).catch((err) => {
        globalAny.log.error("[insetUser] 注册失败: " + err);
        ctx.body = {
          code: -1,
          msg: err
        }
      })
    }

  })

})

module.exports = router

export { };