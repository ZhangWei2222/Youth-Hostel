/*
 * @Description: 房间相关接口--获取店家评论
 * @Author: Vivian
 * @Date: 2020-03-10 10:32:41
 * @LastEditTime: 2020-03-11 19:11:36
 */

const globalAny: any = global;
let router = require('koa-router')();
let userModel = require('../lib/mysql-room.ts');
const multer = require('koa-multer');
const checkToken = require('../token/checkToken.ts');

router.get('/api/roomDetail', async (ctx, next) => {
  await userModel.roomDetail(ctx.query.roomId).then(async (res) => {
    // globalAny.log.trace("[roomDetail] 房间详情获取成功!" + JSON.stringify(res));
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
        },
        facilityList: []
      }
    }
    await userModel.houseDetail(res[0].houseId).then(async (res) => {
      ctx.body.data.houseData = res;
    })
    await userModel.landlordDetail(res[0].landlordId).then(async (res) => {
      ctx.body.data.landlordData = res;
    })
    await userModel.commentDetail(ctx.query.roomId).then(async (res) => {
      ctx.body.data.commentsData.list = res;
    })
    await userModel.commentAVG(ctx.query.roomId).then(async (res) => {
      ctx.body.data.commentsData.average = res;
    })
    await userModel.facilityList(res[0].houseId).then(async (res) => {
      ctx.body.data.facilityList = res;
    })
  }).catch((err) => {
    globalAny.log.error("[roomDetail] 房间详情获取失败!" + err);
    ctx.body = {
      code: -1,
      msg: err,
      data: []
    }
  })
})

router.get('/api/roomComments', async (ctx, next) => {
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
      ctx.body.data.roomData = res;
    })
    await userModel.landlordComments(ctx.query.landlordId).then(async (res) => {
      ctx.body.data.commentData.list = res;
    })
    await userModel.landlordCommentsAVG(ctx.query.landlordId).then(async (res) => {
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