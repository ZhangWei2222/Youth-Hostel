/*
 * @Description: 订单相关接口
 * @Author: Vivian
 * @Date: 2020-03-11 16:29:45
 * @LastEditTime: 2020-03-12 18:34:09
 */

const globalAny: any = global;
let router = require('koa-router')();
let userModel = require('../lib/mysql-order.ts');
const uuidV1 = require('uuid/v1');
const multer = require('koa-multer');
const checkToken = require('../token/checkToken.ts');

router.get('/api/sumbitRoomInfo', async (ctx, next) => {
  await userModel.sumbitRoomInfo(ctx.query.roomId).then(async (res) => {
    globalAny.log.trace("[sumbitRoomInfo] 房间信息获取成功!" + JSON.stringify(res));
    ctx.body = {
      code: 0,
      msg: '房间信息详情获取成功',
      data: res
    }
  }).catch((err) => {
    globalAny.log.error("[sumbitRoomInfo] 房间信息获取失败!" + err);
    ctx.body = {
      code: -1,
      msg: err,
      data: []
    }
  })
})

router.get('/api/orderDetail', async (ctx, next) => {
  await userModel.orderDetail(ctx.query.orderId).then(async (res) => {
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

// 下订单
router.post('/api/submitOrder', async (ctx, next) => {
  let order = {
    roomId: ctx.request.body.roomId,
    startDate: ctx.request.body.startDate,
    days: ctx.request.body.days,
    orderTime: ctx.request.body.orderTime,
    userId: ctx.request.body.userId,
    idCard: ctx.request.body.idCard,
    phoneNum: ctx.request.body.phoneNum,
    userName: ctx.request.body.userName,
    message: ctx.request.body.message,
    key: uuidV1()
  }
  await userModel.insetOrder(order).then(async (res) => {
    // globalAny.log.trace("[submitOrder] 下订单成功" + JSON.stringify(res));
    ctx.body = {
      code: 0,
      msg: '下订单成功!',
      data: { orderId: res.insertId }
    }
    await userModel.setGuestsNum({ roomId: order.roomId, type: 0 }).then(async (res) => {
      // globalAny.log.trace("[setGuestsNum] 调整可住人数" + JSON.stringify(res));
    })
  }).catch((err) => {
    globalAny.log.error("[submitOrder] 下订单失败: " + err);
    ctx.body = {
      code: -1,
      msg: err
    }
  })
})

// 退房
router.post('/api/checkOutOrder', async (ctx, next) => {
  globalAny.log.debug(ctx.request.body);
  await userModel.checkOutOrder({ orderId: ctx.request.body.orderId, status: -2 }).then(async (res) => {
    globalAny.log.trace("[checkOutOrder] 退房成功" + JSON.stringify(res));
    ctx.body = {
      code: 0,
      msg: '退房成功!'
    }
    await userModel.setGuestsNum({ roomId: ctx.request.body.roomId, type: 1 }).then(async (res) => {
      globalAny.log.trace("[setGuestsNum] 调整可住人数" + JSON.stringify(res));
    })
  }).catch((err) => {
    globalAny.log.error("[submitOrder] 下订单失败: " + err);
    ctx.body = {
      code: -1,
      msg: err
    }
  })
})

// 删除订单
router.post('/api/deleteOrder', async (ctx, next) => {
  await userModel.deleteOrder({ orderId: ctx.request.body.orderId }).then(async (res) => {
    globalAny.log.trace("[deleteOrder] 删除订单成功" + JSON.stringify(res));
    ctx.body = {
      code: 0,
      msg: '退房成功!'
    }
  }).catch((err) => {
    globalAny.log.error("[deleteOrder] 删除订单失败: " + err);
    ctx.body = {
      code: -1,
      msg: err
    }
  })
})

module.exports = router

export { };