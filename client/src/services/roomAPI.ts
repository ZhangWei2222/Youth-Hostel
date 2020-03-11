/*
 * @Description: 房间相关API-房间详情、店家评论
 * @Author: Vivian
 * @Date: 2020-03-10 10:36:26
 * @LastEditTime: 2020-03-11 11:27:59
 */


import http from './lib/http'

export const roomDetailAPI = params => {
  return http.get('/api/roomDetail', { params })
}

export const landlordInfoAPI = params => {
  return http.get('/api/landlordInfo', { params })
}

export const roomCommentsAPI = params => {
  return http.get('/api/roomComments', { params })
}