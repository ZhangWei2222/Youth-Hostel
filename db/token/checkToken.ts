const jwt = require('jsonwebtoken');

// 接口访问必须要有Token (需要用户登录)
module.exports = async (ctx, next) => {
  const authorization = ctx.get('Authorization'); // request 带过来的 token  存在浏览器的cookie中
  if (authorization == '') {
    ctx.body = {
      state: 104,
      msg: '用户未登录'
    }
    return false
  }
  const token = authorization;
  let tokenContent;
  try {
    // 根据 "kuaifengle" 钥解析 token 判断是否失效
    tokenContent = await jwt.verify(token, 'wei');     //如果token过期或验证失败，将抛出错误
    // 存入ctx 中 next() 可以获取到设置的 userInfo 数据
    ctx.userInfo = tokenContent
  } catch (err) {
    ctx.body = {
      state: 0,
      msg: '用户登录验证失效'
    }
  }
  await next();
}

export { }