import axios from 'axios';
import { Message } from 'element-ui';

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000,
});

service.interceptors.request.use(
  (config) => {
    const axiosConfig = config;
    const token = localStorage.getItem('token');
    if (token) {
      // axiosConfig.headers = { ...config.headers, 'C-Token': 'testToken' };
      axiosConfig.headers.token = token;
    }
    return axiosConfig;
  },
  error => Promise.reject(error),
);

// service.interceptors.response.use(({ data, code, message }) => {
service.interceptors.response.use(({ data }) => {
  const { code, message } = data;
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
