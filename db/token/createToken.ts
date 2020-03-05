/*
 * @Description: 创建token
 * @Author: Vivian
 * @Date: 2020-03-03 10:26:57
 * @LastEditTime: 2020-03-05 10:56:29
 */

const jwt = require('jsonwebtoken');

//登录时：核对用户名和密码成功后，应用将用户的id 作为JWT Payload的一个属性
module.exports = function (user) {

  // jwt.sign 参数详情
  //第一个是Payload，也就是用户信息（要注意payload不要传整个文档，Payload需要的是唯一且不变的数据，否则当Payload改变的时候需要重新下发token）。这里我们用文档的id，目的是唯一标识用户

  // 第二个参数是密钥，也就是你生成Signature时所用到的加密密钥。要注意这里必须和创建jwt的时候传入的secret一致，因为服务端需要用创建时的secret来解密。

  // 第三个参数则是设置一个token的过期时间，这里我们设置的是1天。

  const token = jwt.sign({
    userId: user.id
  }, 'wei', {    // "kuaifengle"  是校验码    解析时需要一致 才能取到 user 信息
    expiresIn: '24h' //过期时间设置为24h 格式有(s, m, h , day)。那么decode这个token的时候得到的过期时间为 : 创建token的时间 +　设置的值
  });
  return token; // 返回token  前端存在浏览器cookie 中
};

export { }