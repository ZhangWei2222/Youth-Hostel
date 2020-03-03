import http from './lib/http'

export const userInfoAPI = params => {
  return http.post('/api/userInfo', params);
}