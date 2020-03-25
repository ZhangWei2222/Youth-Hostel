/*
 * @Description: 搜索相关API
 * @Author: Vivian
 * @Date: 2020-03-24 09:44:17
 * @LastEditTime: 2020-03-25 11:55:06
 */

import http from './lib/http'

export const roomListAPI = params => {
  return http.get('/api/roomList', { params })
}

export const locationListAPI = () => {
  return http.get('/api/locationListAPI')
}