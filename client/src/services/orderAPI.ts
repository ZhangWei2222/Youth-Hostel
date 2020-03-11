/*
 * @Description: 订单API
 * @Author: Vivian
 * @Date: 2020-03-11 16:51:49
 * @LastEditTime: 2020-03-11 16:52:30
 */

import http from './lib/http'

export const userInfoAPI = () => {
  return http.get('/api/orderDetail');
}