/*
 * @Description: 订单相关接口
 * @Author: Vivian
 * @Date: 2020-03-11 16:29:45
 * @LastEditTime: 2020-03-11 16:52:19
 */

const globalAny: any = global;
let router = require('koa-router')();
let userModel = require('../lib/mysql-order.ts');
const multer = require('koa-multer');
const checkToken = require('../token/checkToken.ts');

router.get('/api/orderDetail', async (ctx, next) => {
  // router.get('/api/orderDetail', checkToken,async (ctx, next) => {
  // ctx.userInfo.userId
  await userModel.orderDetail(11).then(async (res) => {
    globalAny.log.trace("[orderDetail] 房间详情获取成功!" + JSON.stringify(res));
    ctx.body = {
      code: 0,
      msg: '订单详情获取成功',
      data: res
    }
  }).catch((err) => {
    globalAny.log.error("[orderDetail] 订单详情获取失败!" + err);
    ctx.body = {
      code: -1,
      msg: err,
      data: []
    }
  })
})

module.exports = router

export { };