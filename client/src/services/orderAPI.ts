/*
 * @Description: 订单API
 * @Author: Vivian
 * @Date: 2020-03-11 16:51:49
 * @LastEditTime: 2020-03-12 13:15:56
 */

import http from './lib/http'

export const sumbitRoomInfoAPI = (params) => {
  return http.get('/api/sumbitRoomInfo', { params });
}

export const orderDetailAPI = (params) => {
  return http.get('/api/orderDetail', { params });
}

export const submitOrderAPI = (params) => {
  return http.post('/api/submitOrder', params);
}