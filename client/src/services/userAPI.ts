/*
 * @Description: 用户相关API--用户信息、编辑信息、上传头像
 * @Author: Vivian
 * @Date: 2020-03-03 21:24:17
 * @LastEditTime: 2020-03-09 16:35:27
 */

import http from './lib/http'

export const userInfoAPI = () => {
  return http.get('/api/userInfo');
}

export const editUserInfoAPI = params => {
  return http.post('/api/editUserInfo', params);
}

export const userImageAPI = (params, config) => {
  return http.post('/api/userImage', params, config);
}

export const userCommentsAPI = () => {
  return http.get('/api/userComments');
}