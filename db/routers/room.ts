/*
 * @Description: 房间相关接口--获取店家评论
 * @Author: Vivian
 * @Date: 2020-03-10 10:32:41
 * @LastEditTime: 2020-03-30 12:55:18
 */

const globalAny: any = global;
let router = require('koa-router')();
let userModel = require('../lib/mysql-room.ts');

router.get('/api/roomDetail', async (ctx, next) => {
  await userModel.roomDetail({ roomId: ctx.query.roomId, searchStartDate: ctx.query.searchStartDate }).then(async (res) => {
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

    await userModel.landlordRoomInfo_roomList({ landlordId: ctx.query.landlordId }).then(async (res) => {
      globalAny.log.trace("[landlordRoomInfo_roomList] 房间列表获取成功!" + JSON.stringify(res));
      ctx.body.data.roomData = res;
      ctx.body.data.roomData.forEach(data => {
        data.guestsNum = 0
      })

      let roomIds = []
      ctx.body.data.roomData.forEach((item) => {
        roomIds.push(item.id);
      })
      console.log(roomIds)
      if (roomIds.length > 0) {
        await userModel.landlordRoomInfo_dateFilter({ searchStartDate: ctx.query.searchStartDate, roomIds: roomIds }).then(async (res) => {
          globalAny.log.trace("[landlordRoomInfo_dateFilter] 筛选日期成功!" + JSON.stringify(res));
          let errIds = []
          res.forEach((item) => {
            if (item.searchGuestsNum >= item.roommateNum) {
              errIds.push(item.id)
            }
            ctx.body.data.roomData.forEach(data => {
              if (item.id === data.id) {
                data.guestsNum = item.searchGuestsNum
              }
            })
          })
          errIds.forEach(errId => {
            ctx.body.data.roomData = ctx.body.data.roomData.filter(item => item.id !== errId);
          })
        })
      }
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