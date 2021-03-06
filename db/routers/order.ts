/*
 * @Description: 订单相关接口
 * @Author: Vivian
 * @Date: 2020-03-11 16:29:45
 * @LastEditTime: 2020-04-01 12:12:44
 */

const globalAny: any = global;
let router = require('koa-router')();
let userModel = require('../lib/mysql-order.ts');
const uuidV1 = require('uuid/v1');
const checkToken = require('../token/checkToken.ts');

router.get('/api/orderList', checkToken, async (ctx, next) => {
  let params = {
    type: 0,
    userId: ctx.userInfo.userId
  }
  await userModel.orderList(params).then(async (res) => {
    globalAny.log.trace("[orderList] 全部订单列表获取成功!" + JSON.stringify(res));
    ctx.body = {
      code: 0,
      msg: '订单列表获取成功',
      data: {
        allList: res,
        effectiveList: [],
        invalidList: []
      }
    }
    params.type = 1;
    await userModel.orderList(params).then(async (res) => {
      // globalAny.log.trace("[orderList] 有效订单列表获取成功!" + JSON.stringify(res));
      ctx.body.data.effectiveList = res;
      params.type = -1;
      await userModel.orderList(params).then(async (res) => {
        // globalAny.log.trace("[orderList] 失效订单列表获取成功!" + JSON.stringify(res));
        ctx.body.data.invalidList = res;
      })
    })
  }).catch((err) => {
    globalAny.log.error("[orderList] 订单列表获取失败!" + err);
    ctx.body = {
      code: -1,
      msg: err,
      data: []
    }
  })
})

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
    globalAny.log.trace("[orderDetail] 订单详情获取成功!" + JSON.stringify(res));
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
router.post('/api/submitOrder', checkToken, async (ctx, next) => {
  let order = {
    roomId: ctx.request.body.roomId,
    startDate: ctx.request.body.startDate,
    days: ctx.request.body.days,
    orderTime: ctx.request.body.orderTime,
    userId: ctx.userInfo.userId,
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
  }).catch((err) => {
    globalAny.log.error("[submitOrder] 下订单失败: " + err);
    ctx.body = {
      code: -1,
      msg: err
    }
  })
})

// 退房
router.post('/api/checkOutOrder', checkToken, async (ctx, next) => {
  await userModel.changeOrderStatus({ orderId: ctx.request.body.orderId, status: -6 }).then(async (res) => {
    globalAny.log.trace("[checkOutOrder] 退房申请发出成功" + JSON.stringify(res));
    ctx.body = {
      code: 0,
      msg: '退房申请发出成功!'
    }
  }).catch((err) => {
    globalAny.log.error("[submitOrder] 退房申请发出失败: " + err);
    ctx.body = {
      code: -1,
      msg: err
    }
  })
})

// 删除订单
router.post('/api/deleteOrder', checkToken, async (ctx, next) => {
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

// 评论订单
router.post('/api/orderComments', checkToken, async (ctx, next) => {
  let temp = {
    userId: ctx.userInfo.userId,
    orderId: ctx.request.body.orderId,
    roomId: ctx.request.body.roomId,
    describeScore: ctx.request.body.describeScore,
    communicateScore: ctx.request.body.communicateScore,
    hygieneScore: ctx.request.body.hygieneScore,
    administrationScore: ctx.request.body.administrationScore,
    message: ctx.request.body.message,
  };
  await userModel.orderComments(temp).then(async (res) => {
    globalAny.log.trace("[orderComments] 评价订单成功" + JSON.stringify(res));
    ctx.body = {
      code: 0,
      data: res
    }
    await userModel.changeOrderStatus({ orderId: temp.orderId, status: 1 }).then(async (res) => {
      globalAny.log.trace("[changeOrderStatus] 改变订单状态成功" + JSON.stringify(res));
      ctx.body = {
        code: 0,
        data: res
      }
    })
  }).catch((err) => {
    globalAny.log.error("[orderComments] 评价订单失败:" + err);
    ctx.body = {
      code: -1,
      msg: err,
      data: []
    }
  })
})

module.exports = router

export { };