/*
 * @Description:
 * @Author: Vivian
 * @Date: 2020-03-31 16:22:10
 * @LastEditTime: 2020-04-01 11:15:20
 */

import http from './lib/http'

export const adminInfoAPI = () => {
  return http.get('/api/adminInfo');
}

export const adminListAPI = () => {
  return http.get('/api/adminList');
}

export const adminDetailAPI = (params) => {
  return http.get('/api/adminDetail', { params });
}

export const refuseOrderAPI = (params) => {
  return http.post('/api/refuseOrder', params);
}

export const checkInOrderAPI = (params) => {
  return http.post('/api/checkInOrder', params);
}

export const userCommentsAPI = (params) => {
  return http.post('/api/userComments', params);
}