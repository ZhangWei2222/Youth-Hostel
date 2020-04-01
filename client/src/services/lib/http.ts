/*
 * @Description: 对axios设置request拦截器和response拦截器
 * @Author: Vivian
 * @Date: 2020-03-03 21:24:04
 * @LastEditTime: 2020-03-31 16:46:35
 */
import axios from 'axios'
import NProgress from 'nprogress'
import cookie from 'js-cookie'
import 'nprogress/nprogress.css'

var instance = axios.create();
NProgress.configure({ showSpinner: false });

instance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
const urlDev = 'http://localhost:4442'
const urlQa = 'http://101.133.132.172:4442'
process.env.NODE_ENV === 'development' ?
  instance.defaults.baseURL = urlDev :
  instance.defaults.baseURL = urlQa

// http request 拦截器
instance.interceptors.request.use(
  config => {
    config.withCredentials = true
    NProgress.start()
    if (window.location.hash.split('/')[1] === 'admin') {
      config.headers['Authorization'] = cookie.get('landlord_token') || ''; // 设置assent_token
    } else {
      config.headers['Authorization'] = cookie.get('assent_token') || ''; // 设置assent_token
    }
    return config;
  },
  err => {
    return Promise.reject(err);
  });

// http response 拦截器
instance.interceptors.response.use(
  response => {
    NProgress.done()
    if (response.data.msg === "登录验证失效") {
      cookie.remove('assent_token')
    }
    return response;
  },
  error => {
    NProgress.done()
    return Promise.reject(error)
  });

export default instance

