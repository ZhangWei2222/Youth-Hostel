const globalAny: any = global;
let router = require('koa-router')();
let userModel = require('../lib/mysql.ts');
const multer = require('koa-multer');
const checkToken = require('../token/checkToken.ts');



router.get('/api/userInfo', checkToken, async (ctx, next) => {
  // globalAny.log.debug("[userInfo]" + JSON.stringify(ctx.userInfo));
  await userModel.userInfo(ctx.userInfo.userId).then((res) => {
    globalAny.log.trace("[userInfo] 用户信息获取成功!" + res);
    ctx.body = {
      code: 0,
      msg: '用户登录成功!',
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




// 指定文件上传的目录
// const upload = multer({
//   dest: 'uploads/',
// });
const path = require('path')
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../../uploads'))
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
router.post('/user/image', upload.single('avatar'), async (ctx, next) => {
  // 获取上传文件对象
  // console.log(ctx);
  ctx.body = {
    code: 0,
    data: ctx.req.file.filename
  }


})

module.exports = router

export { };