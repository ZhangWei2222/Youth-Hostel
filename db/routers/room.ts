/*
 * @Description: 房间相关接口--获取店家评论
 * @Author: Vivian
 * @Date: 2020-03-10 10:32:41
 * @LastEditTime: 2020-03-10 11:19:12
 */


const globalAny: any = global;
let router = require('koa-router')();
let userModel = require('../lib/mysql-room.ts');
const multer = require('koa-multer');
const checkToken = require('../token/checkToken.ts');

router.get('/api/landlordComments', async (ctx, next) => {
  globalAny.log.debug("[landlordComments]" + JSON.stringify(ctx.query.landlordId));

  await userModel.landlordComments(ctx.query.landlordId).then(async (res) => {
    globalAny.log.trace("[landlordComments] 店家评价获取成功!" + JSON.stringify(res));
    ctx.body = {
      code: 0,
      data: res,
      average: ''
    }
    await userModel.landlordCommentsAVG(ctx.query.landlordId).then(async (res) => {
      globalAny.log.trace("[landlordComments] 店家评价平均数：" + JSON.stringify(res));
      ctx.body.average = res;
    })

  }).catch((err) => {
    globalAny.log.error("[landlordComments] 店家评价获取失败!" + err);
    ctx.body = {
      code: -1,
      msg: err,
      data: []
    }
  })
})

module.exports = router

export { };