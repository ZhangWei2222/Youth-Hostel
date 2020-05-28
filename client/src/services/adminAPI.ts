/*
 * @Description:
 * @Author: Vivian
 * @Date: 2020-03-31 16:22:10
 * @LastEditTime: 2020-05-29 00:19:36
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

export const postUserCommentsAPI = (params) => {
  return http.post('/api/postuserComments', params);
}

export const landlordcheckOutOrderAPI = (params) => {
  return http.post('/api/landlordcheckOutOrder', params);
}