/*
 * @Description: 注册接口
 * @Author: Vivian
 * @Date: 2020-03-03 21:24:04
 * @LastEditTime: 2020-03-05 10:57:20
 */

const globalAny: any = global;
const router = require('koa-router')();
const userModel = require('../lib/mysql.ts');

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
        code: 102,
        msg: '用户已存在!',
        data: []
      }
    } else {  // 否者没有注册
      await userModel.insetUser(user).then((res) => {
        globalAny.log.trace("[insetUser] 注册成功");
        ctx.body = {
          code: 0,
          msg: '注册成功!',
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