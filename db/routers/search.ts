/*
 * @Description: 搜索相关接口
 * @Author: Vivian
 * @Date: 2020-03-24 09:37:30
 * @LastEditTime: 2020-03-27 12:18:41
 */

const globalAny: any = global;
let router = require('koa-router')();
let userModel = require('../lib/mysql-search.ts');

router.get('/api/roomList', async (ctx, next) => {
  await userModel.roomList(ctx.query).then(async (res) => {
    globalAny.log.trace("[roomList] 房间列表获取成功!" + JSON.stringify(res));
    ctx.body = {
      code: 0,
      msg: '房间列表获取成功',
      data: res
    }
    ctx.body.data.forEach(data => {
      data.guestsNum = 0
    })

    let roomIds = []
    ctx.body.data.forEach((item) => {
      roomIds.push(item.id);
    })
    console.log(roomIds)
    if (roomIds.length > 0) {
      await userModel.dateFilter({ searchStartDate: JSON.parse(ctx.query.dateFilter).searchStartDate, roomIds: roomIds }).then(async (res) => {
        globalAny.log.trace("[dateFilter] 筛选日期成功!" + JSON.stringify(res));
        let errIds = []
        res.forEach((item) => {
          if (item.searchGuestsNum >= item.roommateNum) {
            errIds.push(item.id)
          }
          ctx.body.data.forEach(data => {
            if (item.id === data.id) {
              data.guestsNum = item.searchGuestsNum
            }
          })
        })
        errIds.forEach(errId => {
          ctx.body.data = ctx.body.data.filter(item => item.id !== errId);
        })
        let facilityContent = JSON.parse(ctx.query.filter).filter.facility
        if (facilityContent.length > 0) {
          let roomIds = []
          ctx.body.data.forEach((item) => {
            roomIds.push(item.id);
          })
          await userModel.facilityFilter({ content: facilityContent, roomIds: roomIds }).then(async (res) => {
            globalAny.log.trace("[facilityFilter] 筛选便利设施成功!" + JSON.stringify(res));
            ctx.body.data = res
          })
        }
      })
    }


  }).catch((err) => {
    globalAny.log.error("[roomList] 房间列表获取失败!" + err);
    ctx.body = {
      code: -1,
      msg: err,
      data: []
    }
  })
})

router.get('/api/locationListAPI', async (ctx, next) => {
  await userModel.locationListAPI().then(async (res) => {
    // globalAny.log.trace("[locationListAPI] 城市列表获取成功!" + JSON.stringify(res));
    ctx.body = {
      code: 0,
      msg: '房间信息获取成功',
      data: res
    }
  }).catch((err) => {
    globalAny.log.error("[locationListAPI] 城市列表获取失败!" + err);
    ctx.body = {
      code: -1,
      msg: err,
      data: []
    }
  })
})

module.exports = router

export { };