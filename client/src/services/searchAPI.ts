/*
 * @Description: 搜索相关API
 * @Author: Vivian
 * @Date: 2020-03-24 09:44:17
 * @LastEditTime: 2020-03-24 09:44:48
 */

import http from './lib/http'

export const roomListAPI = params => {
  return http.get('/api/roomList', { params })
}