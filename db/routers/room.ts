/*
 * @Description: 房间相关接口--获取店家评论
 * @Author: Vivian
 * @Date: 2020-03-10 10:32:41
 * @LastEditTime: 2020-03-10 18:20:18
 */


const globalAny: any = global;
let router = require('koa-router')();
let userModel = require('../lib/mysql-room.ts');
const multer = require('koa-multer');
const checkToken = require('../token/checkToken.ts');

router.get('/api/roomDetail', async (ctx, next) => {
  // globalAny.log.debug("[roomDetailAPI]" + JSON.stringify(ctx.query.landlordId));

  await userModel.roomDetail(ctx.query.roomId).then(async (res) => {
    globalAny.log.trace("[roomDetailAPI] 房间详情获取成功!" + JSON.stringify(res));
    ctx.body = {
      code: 0,
      msg: '房间详情获取成功',
      data: {
        roomData: res,
        houseData: {},
        landlordData: {},
        commentsData: {
          list: {},
          average: {}
        }
      }
    }
    await userModel.houseDetail(res[0].houseId).then(async (res) => {
      // globalAny.log.trace("[roomDetailAPI] 房源详情获取成功：" + JSON.stringify(res));
      ctx.body.data.houseData = res;
    })
    await userModel.landlordDetail(res[0].landlordId).then(async (res) => {
      // globalAny.log.trace("[roomDetailAPI] 店家详情获取成功：" + JSON.stringify(res));
      ctx.body.data.landlordData = res;
    })
    await userModel.commentDetail(res[0].id).then(async (res) => {
      // globalAny.log.trace("[roomDetailAPI] 房间评价详情获取成功：" + JSON.stringify(res));
      ctx.body.data.commentsData.list = res;
    })
    await userModel.commentAVG(res[0].id).then(async (res) => {
      // globalAny.log.trace("[roomDetailAPI] 房间评价数据获取成功：" + JSON.stringify(res));
      ctx.body.data.commentsData.average = res;
    })
  }).catch((err) => {
    globalAny.log.error("[roomDetailAPI] 房间详情获取失败!" + err);
    ctx.body = {
      code: -1,
      msg: err,
      data: []
    }
  })
})

router.get('/api/roomComments', async (ctx, next) => {
  // globalAny.log.debug("[roomComments]" + JSON.stringify(ctx.query.roomId));

  await userModel.commentDetail(ctx.query.roomId).then(async (res) => {
    globalAny.log.trace("[roomComments] 房间评价获取成功!" + JSON.stringify(res));
    ctx.body = {
      code: 0,
      data: res,
      average: ''
    }
    await userModel.commentAVG(ctx.query.roomId).then(async (res) => {
      globalAny.log.trace("[roomComments] 房间评价平均数：" + JSON.stringify(res));
      ctx.body.average = res;
    })

  }).catch((err) => {
    globalAny.log.error("[roomComments] 房间评价获取失败!" + err);
    ctx.body = {
      code: -1,
      msg: err,
      data: []
    }
  })
})

router.get('/api/landlordInfo', async (ctx, next) => {
  globalAny.log.debug("[landlordInfo]" + JSON.stringify(ctx.query.roomId));

  await userModel.landlordDetail(ctx.query.landlordId).then(async (res) => {
    globalAny.log.trace("[landlordInfo] 店家信息获取成功!" + JSON.stringify(res));
    ctx.body = {
      code: 0,
      msg: '店家详情获取成功',
      data: {
        landlordData: res[0],
        roomData: [],
        commentData: {
          list: [],
          totalScore: 0
        }
      }
    }
    await userModel.landlordInfo(ctx.query.landlordId).then(async (res) => {
      // globalAny.log.trace("[roomDetailAPI] 店家详情获取成功：" + JSON.stringify(res));
      ctx.body.data.roomData = res;
    })
    await userModel.landlordComments(ctx.query.landlordId).then(async (res) => {
      // globalAny.log.trace("[landlordInfo] 店家评论：" + JSON.stringify(res));
      ctx.body.data.commentData.list = res;
    })
    await userModel.landlordCommentsAVG(ctx.query.landlordId).then(async (res) => {
      // globalAny.log.trace("[landlordInfo] 店家评论数据：" + JSON.stringify(res));
      ctx.body.data.commentData.totalScore = res[0].value;
    })

  }).catch((err) => {
    globalAny.log.error("[landlordInfo] 店家详情获取失败!" + err);
    ctx.body = {
      code: -1,
      msg: err,
      data: []
    }
  })
})

module.exports = router

export { };