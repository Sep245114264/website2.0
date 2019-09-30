import axios from 'axios';
import { Message } from 'element-ui';
import router from '@/router';

const service = axios.create({
  // baseURL: process.env.VUE_APP_BASE_API,
  baseURL: '/api',
  timeout: 5000,
});

service.interceptors.request.use(
  (config) => {
    const axiosConfig = config;
    return axiosConfig;
  },
  error => Promise.reject(error),
);

// service.interceptors.response.use(({ data, code, message }) => {
service.interceptors.response.use(({ data }) => {
  const { code, message } = data;
  if (code === 403) {
    router.push({ path: '/login' });
  }
  if (code !== 200) {
    Message({
      message: message || 'Error!',
      type: 'error',
    });
    return Promise.reject(message || 'error');
  }
  return data;
});

export default service;
