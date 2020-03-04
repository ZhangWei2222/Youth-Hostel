import http from './lib/http'

export const userInfoAPI = () => {
  return http.get('/api/userInfo');
}