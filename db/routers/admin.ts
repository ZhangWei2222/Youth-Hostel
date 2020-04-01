/*
 * @Description:
 * @Author: Vivian
 * @Date: 2020-03-31 16:23:18
 * @LastEditTime: 2020-04-01 12:24:57
 */

/*
* @Description: 用户相关接口--获取用户信息、编辑用户信息、上传头像、获取用户评论
* @Author: Vivian
* @Date: 2020-03-03 10:26:57
* @LastEditTime: 2020-03-18 12:51:36
*/

const globalAny: any = global;
let router = require('koa-router')();
let userModel = require('../lib/mysql-admin.ts');
const multer = require('koa-multer');
const checkToken = require('../token/checkToken.ts');

router.get('/api/adminInfo', checkToken, async (ctx, next) => {
  // globalAny.log.debug("[adminInfo]" + JSON.stringify(ctx.adminInfo));
  await userModel.adminInfo(ctx.userInfo.userId).then((res) => {
    globalAny.log.trace("[adminInfo] 店家信息获取成功!" + JSON.stringify(res));
    ctx.body = {
      code: 0,
      msg: '店家信息获取成功!',
      data: res
    }
  }).catch((err) => {
    globalAny.log.error("[adminInfo] 店家信息获取失败!" + err);
    ctx.body = {
      code: -1,
      msg: err,
      data: []
    }
  })
})

router.get('/api/adminList', checkToken, async (ctx, next) => {
  let params = {
    type: 0,
    landlordId: ctx.userInfo.userId
  }
  await userModel.adminList(params).then(async (res) => {
    globalAny.log.trace("[adminList] 全部订单列表获取成功!" + JSON.stringify(res));
    ctx.body = {
      code: 0,
      msg: '订单列表获取成功',
      data: res
    }
    for (let i = 0; i < ctx.body.data.length; i++) {
      ctx.body.data[i].isCommented = false
      await userModel.findComments(ctx.body.data[i].id).then(async (res) => {
        globalAny.log.trace("[findComments] 订单是否评价获取成功!" + JSON.stringify(res[0]));
        if (res[0]) {
          ctx.body.data[i].isCommented = true
          console.log(ctx.body.data[i])
        }
      })
    }
  }).catch((err) => {
    globalAny.log.error("[adminList] 订单列表获取失败!" + err);
    ctx.body = {
      code: -1,
      msg: err,
      data: []
    }
  })
})

router.get('/api/adminDetail', async (ctx, next) => {
  await userModel.adminDetail(ctx.query.orderId).then(async (res) => {
    globalAny.log.trace("[adminDetail] 订单详情获取成功!" + JSON.stringify(res));
    ctx.body = {
      code: 0,
      msg: '订单详情获取成功',
      data: res
    }
    await userModel.findComments(ctx.body.data[0].id).then(async (res) => {
      globalAny.log.trace("[findComments] 订单是否评价获取成功!" + JSON.stringify(res[0]));
      if (res[0]) {
        ctx.body.data[0].isCommented = true
      }
    })
  }).catch((err) => {
    globalAny.log.error("[adminDetail] 订单详情获取失败!" + err);
    ctx.body = {
      code: -1,
      msg: err,
      data: []
    }
  })
})

router.get('/api/userComments', checkToken, async (ctx, next) => {
  // globalAny.log.debug("[userComments]" + JSON.stringify(ctx.userInfo));

  await userModel.userComments(ctx.userInfo.userId).then(async (res) => {
    globalAny.log.trace("[userComments] 用户评价获取成功!" + JSON.stringify(res));
    ctx.body = {
      code: 0,
      data: res,
      average: ''
    }
    await userModel.userCommentsAVG(ctx.userInfo.userId).then(async (res) => {
      globalAny.log.trace("[userCommentsAVG] 用户评价平均数：" + JSON.stringify(res));
      ctx.body.average = res;
    })

  }).catch((err) => {
    globalAny.log.error("[userComments] 用户评价获取失败!" + err);
    ctx.body = {
      code: -1,
      msg: err,
      data: []
    }
  })
})

router.post('/api/refuseOrder', async (ctx, next) => {
  await userModel.refuseOrder(ctx.request.body.orderId).then(async (res) => {
    globalAny.log.trace("[refuseOrder] 取消入住成功!" + JSON.stringify(res));
    ctx.body = {
      code: 0,
      msg: '取消入住成功',
      data: res
    }
  }).catch((err) => {
    globalAny.log.error("[refuseOrder] 取消入住失败!" + err);
    ctx.body = {
      code: -1,
      msg: err,
      data: []
    }
  })
})

router.post('/api/checkInOrder', async (ctx, next) => {
  await userModel.checkInOrder(ctx.request.body.orderId).then(async (res) => {
    globalAny.log.trace("[checkInOrder] 确认入住成功!" + JSON.stringify(res));
    ctx.body = {
      code: 0,
      msg: '确认入住成功',
      data: res
    }
  }).catch((err) => {
    globalAny.log.error("[checkInOrder] 确认入住失败!" + err);
    ctx.body = {
      code: -1,
      msg: err,
      data: []
    }
  })
})

// 评论房客
router.post('/api/userComments', checkToken, async (ctx, next) => {
  let temp = {
    userId: ctx.userInfo.userId,
    orderId: ctx.request.body.orderId,
    landlordId: ctx.request.body.landlordId,
    describeScore: ctx.request.body.describeScore,
    communicateScore: ctx.request.body.communicateScore,
    hygieneScore: ctx.request.body.hygieneScore,
    qualityScore: ctx.request.body.qualityScore,
    message: ctx.request.body.message,
  };
  await userModel.userComments(temp).then(async (res) => {
    globalAny.log.trace("[userComments] 评价房客成功" + JSON.stringify(res));
    ctx.body = {
      code: 0,
      data: res
    }
  }).catch((err) => {
    globalAny.log.error("[userComments] 评价房客失败:" + err);
    ctx.body = {
      code: -1,
      msg: err,
      data: []
    }
  })
})

// 退房
router.post('/api/landlordcheckOutOrder', checkToken, async (ctx, next) => {
  await userModel.landlordcheckOutOrder({ orderId: ctx.request.body.orderId, status: -2 }).then(async (res) => {
    globalAny.log.trace("[landlordcheckOutOrder] 退房成功" + JSON.stringify(res));
    ctx.body = {
      code: 0,
      msg: '退房成功!'
    }
  }).catch((err) => {
    globalAny.log.error("[landlordcheckOutOrder] 退房失败: " + err);
    ctx.body = {
      code: -1,
      msg: err
    }
  })
})

module.exports = router

export { };