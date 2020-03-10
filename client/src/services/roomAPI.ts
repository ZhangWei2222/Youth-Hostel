/*
 * @Description: 房间相关API-店家评论
 * @Author: Vivian
 * @Date: 2020-03-10 10:36:26
 * @LastEditTime: 2020-03-10 11:18:35
 */


import http from './lib/http'

export const landlordCommentsAPI = params => {
  return http.get('/api/landlordComments', { params })
}