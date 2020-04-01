/*
 * @Description: 用户相关接口--获取用户信息、编辑用户信息、上传头像、获取用户评论
 * @Author: Vivian
 * @Date: 2020-03-03 10:26:57
 * @LastEditTime: 2020-03-31 17:38:07
 */

const globalAny: any = global;
let router = require('koa-router')();
let userModel = require('../lib/mysql.ts');
const multer = require('koa-multer');
const checkToken = require('../token/checkToken.ts');

router.get('/api/userInfo', checkToken, async (ctx, next) => {
  // globalAny.log.debug("[userInfo]" + JSON.stringify(ctx.userInfo));
  await userModel.userInfo(ctx.userInfo.userId).then((res) => {
    globalAny.log.trace("[userInfo] 用户信息获取成功!" + JSON.stringify(res));
    ctx.body = {
      code: 0,
      msg: '用户信息获取成功!',
      data: res
    }
  }).catch((err) => {
    globalAny.log.error("[userInfo] 用户信息获取失败!" + err);
    ctx.body = {
      code: -1,
      msg: err,
      data: []
    }
  })
})

router.post('/api/editUserInfo', checkToken, async (ctx, next) => {

  let user = {
    id: ctx.request.body.id,
    password: ctx.request.body.password,
    phoneNum: ctx.request.body.phoneNum,
    message: ctx.request.body.message
  }
  // globalAny.log.debug("[editUserInfo] 看参数" + JSON.stringify(user));

  await userModel.editUserInfo(user).then((res) => {
    globalAny.log.trace("[editUserInfo] 编辑用户信息成功!" + res);
    ctx.body = {
      code: 0,
      msg: '编辑成功!',
      data: res
    }
  }).catch((err) => {
    globalAny.log.error("[editUserInfo] 编辑用户信息失败!" + err);
    ctx.body = {
      code: -1,
      msg: err,
      data: []
    }
  })
})

const path = require('path')
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../../public/userUploads'))
  },
  filename: function (req, file, cb) {
    let type = file.originalname.split('.')[1]
    cb(null, `${file.fieldname}-${Date.now().toString(16)}.${type}`)
  }
})
// //文件上传限制
// const limits = {
//   fields: 10,//非文件字段的数量
//   fileSize: 500 * 1024,//文件大小 单位 b
//   files: 1//文件数量
// }
const upload = multer({ storage })
router.post('/api/userImage', checkToken, upload.single('avatar'), async (ctx, next) => {
  // globalAny.log.debug("[userImage] 查看参数!" + ctx.req.body.id + ctx.req.file.filename);
  let user = {
    id: ctx.req.body.id,
    filename: ctx.req.file.filename
  }

  await userModel.uploadUserAvator(user).then((res) => {
    globalAny.log.trace("[userImage] 头像上传成功!" + ctx.req.file.filename);
    ctx.body = {
      code: 0,
      msg: '上传成功!',
      filename: ctx.req.file.filename
    }
  }).catch((err) => {
    globalAny.log.error("[userImage] 头像上传成功!" + err);
    ctx.body = {
      code: -1,
      msg: err,
      data: []
    }
  })


})

router.get('/api/userComments', checkToken, async (ctx, next) => {
  // globalAny.log.debug("[userComments]" + JSON.stringify(ctx.userInfo));
  let userId = ctx.query.userId ? ctx.query.userId : ctx.userInfo.userId

  await userModel.userComments(userId).then(async (res) => {
    globalAny.log.trace("[userComments] 用户评价获取成功!" + JSON.stringify(res));
    ctx.body = {
      code: 0,
      data: res,
      average: ''
    }
    await userModel.userCommentsAVG(userId).then(async (res) => {
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

module.exports = router

export { };