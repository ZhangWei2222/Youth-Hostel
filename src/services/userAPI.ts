import http from './lib/http'

export const userInfoAPI = params => {
  return http.get('/api/userInfo', params);
}