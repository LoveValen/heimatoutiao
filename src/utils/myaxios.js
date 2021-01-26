import axios from 'axios';
import { Toast } from 'vant';

// export default axios.create({
//   baseURL: 'http://localhost:3000'
// });

axios.defaults.baseURL = 'http://127.0.0.1:3000';

// 添加请求拦截器
axios.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  // console.log(config);
  let token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = token;
  }
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  return response;
}, function (error) {
  // console.dir(error);
  console.log('href-----' + location.href);
  console.log('hash-----' + location.hash);
  if (error.response.data.message == '用户信息验证失败') {
    Toast.fail({ message: '请登录账号' });
    window.location.href = '#/login?redirecturl=' + location.hash.substr(1);
  }
  // 对响应错误做点什么
  return Promise.reject(error);
});

export default axios;