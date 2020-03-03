import http from './lib/http'

export const signUpAPI = params => {
  return http.post('/api/signUp', params);
}

export const signInAPI = params => {
  return http.post('/api/signIn', params);
}