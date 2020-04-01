/*
 * @Description: 登录接口
 * @Author: Vivian
 * @Date: 2020-03-03 21:24:17
 * @LastEditTime: 2020-03-31 16:04:17
 */
const globalAny: any = global;
const router = require('koa-router')();
const userModel = require('../lib/mysql.ts');

const createToken = require('../token/createToken.ts');

router.post('/api/signIn', async (ctx, next) => {
  // globalAny.log.debug('登陆？？？' + JSON.stringify(ctx));
  let user = {
    username: ctx.request.body.username,
    password: ctx.request.body.password
  }

  await userModel.findUser(user.username).then((res) => {
    if (!res.length) {
      ctx.body = {
        code: 101,
        msg: '用户未注册!',
        data: []
      }
      globalAny.log.error("[findUser] 用户未注册!");
    } else {
      // globalAny.log.debug("[findUser] 查看密码" + md5(res[0].password) + JSON.stringify(res[0]));
      if (res[0].password === user.password) {
        let token = createToken(res[0]) // 创建token 存储用户id等重要信息

        ctx.body = {
          code: 0,
          msg: '用户登录成功!',
          data: [],
          token
        }
        globalAny.log.trace("[findUser] 登录成功!");
      } else {
        ctx.body = {
          code: 103,
          msg: '用户名或者密码错误!',
          data: []
        }
        globalAny.log.error("[findUser] 用户名或者密码错误!");
      }
    }
  }).catch((err) => {
    ctx.body = {
      code: -1,
      msg: err,
      data: []
    }
    globalAny.log.error("[findUser] 登录失败:" + err);
  })
})

router.post('/api/landlordSignIn', async (ctx, next) => {
  // globalAny.log.debug('店家登陆？？？' + JSON.stringify(ctx));
  let user = {
    username: ctx.request.body.username,
    password: ctx.request.body.password
  }

  await userModel.findLandlord(user.username).then((res) => {
    if (!res.length) {
      ctx.body = {
        code: 101,
        msg: '店家未注册!',
        data: []
      }
      globalAny.log.error("[findUser] 店家未注册!");
    } else {
      // globalAny.log.debug("[findLandlord] 查看密码" + md5(res[0].password) + JSON.stringify(res[0]));
      if (res[0].password === user.password) {
        let token = createToken(res[0]) // 创建token 存储店家id等重要信息

        ctx.body = {
          code: 0,
          msg: '店家登录成功!',
          data: [],
          token
        }
        globalAny.log.trace("[findLandlord] 登录成功!");
      } else {
        ctx.body = {
          code: 103,
          msg: '店家名或者密码错误!',
          data: []
        }
        globalAny.log.error("[findLandlord] 店家名或者密码错误!");
      }
    }
  }).catch((err) => {
    ctx.body = {
      code: -1,
      msg: err,
      data: []
    }
    globalAny.log.error("[findUser] 登录失败:" + err);
  })
})

module.exports = router