import axios from 'axios';

const signOut = () => {};

const service = axios.create({
  // baseURL: 'http://42.112.20.36/plesk-site-preview/xedaykidsrelax.com.vn/data'
  baseURL: 'http://172.27.161.164/data'
});

// request interceptor
service.interceptors.request.use(
  config => {
    config.headers['Content-Type'] = 'application/json';
    config.headers['Access-Control-Allow-Origin'] = '*';
    return config;
  },
  error => {
    console.log(error);
    return Promise.reject(error);
  }
);

export default service;
