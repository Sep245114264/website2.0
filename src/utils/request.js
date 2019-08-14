import axios from 'axios';
import { Message } from 'element-ui';

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000,
});

console.log(process.env.VUE_APP_BASE_API);
service.interceptors.request.use(
  (config) => {
    const axiosConfig = config;
    axiosConfig.hjaders = { ...config.headers, 'C-Token': 'testToken' };
    return axiosConfig;
  },
  error => Promise.reject(error),
);

service.interceptors.response.use(({ data, code, message }) => {
  const response = data;
  if (code !== 200) {
    Message({
      message: message || 'Error!',
      type: 'error',
    });
    return Promise.reject(new Error(message || 'error'));
  }
  return response;
});

export default service;
