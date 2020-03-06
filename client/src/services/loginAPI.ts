/*
 * @Description: 注册、登录API
 * @Author: Vivian
 * @Date: 2020-03-03 21:24:17
 * @LastEditTime: 2020-03-05 11:01:39
 */

import http from './lib/http'

export const signUpAPI = params => {
  return http.post('/api/signUp', params);
}

export const signInAPI = params => {
  return http.post('/api/signIn', params);
}