/*
 * @Description: 搜索相关接口
 * @Author: Vivian
 * @Date: 2020-03-24 09:37:30
 * @LastEditTime: 2020-03-24 17:30:43
 */

const globalAny: any = global;
let router = require('koa-router')();
let userModel = require('../lib/mysql-search.ts');
const uuidV1 = require('uuid/v1');
const checkToken = require('../token/checkToken.ts');

router.get('/api/roomList', async (ctx, next) => {

  await userModel.orderList(ctx.query).then(async (res) => {
    globalAny.log.trace("[roomList] 房间列表获取成功!" + JSON.stringify(res));
    ctx.body = {
      code: 0,
      msg: '房间列表获取成功',
      data: res
    }
    if (ctx.query.type === 'filter') {
      let content = JSON.parse(ctx.query.filter)
      if (content.facility.length > 0) {
        let roomIds = []
        ctx.body.data.forEach((item) => {
          roomIds.push(item.id);
        })
        await userModel.facilityFilter({ content: content.facility, roomIds: roomIds }).then(async (res) => {
          globalAny.log.trace("[facilityFilter] 筛选便利设施成功!" + JSON.stringify(res));
          ctx.body.data = res
        })
      }
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

module.exports = router

export { };