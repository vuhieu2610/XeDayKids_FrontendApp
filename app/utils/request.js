/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */
import axios from 'axios';

const signOut = () => {};

export const baseURL = `http://172.27.161.138`;
// export const baseURL = `http://xedaykidsrelax.com.vn/`;

const service = axios.create({
  // baseURL: 'http://42.112.20.36/plesk-site-preview/xedaykidsrelax.com.vn/data'
  baseURL: `${baseURL}/data`,
});

// request interceptor
service.interceptors.request.use(config => {
  config.headers['Content-Type'] = 'application/json';
  // config.headers['Access-Control-Allow-Origin'] = '*';
  config.crossDomain = true;
  config.useCredentails = true;
  return config;
});

export default service;
