import http from './lib/http'

export const userInfoAPI = () => {
  return http.get('/api/userInfo');
}

export const editUserInfoAPI = params => {
  return http.post('/api/editUserInfo', params);
}