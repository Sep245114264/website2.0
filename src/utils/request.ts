import axios from 'axios';
import { ElNotification, ElMessage } from 'element-plus';
// import { mapActions } from 'vuex';
import router from '@/router';
import { formatRequest, formatResponse } from './apiStore';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import { promises } from 'fs';
import { request } from 'http';

const service = axios.create({
  // baseURL: process.env.VUE_APP_BASE_API,
  baseURL: '/api',
  timeout: 5000,
  // headers: {
  //   'Cache-Control': 'no-cache',
  //   Accept: 'application/json, text/plain, */*',
  // },
});

service.interceptors.request.use(
  (config) => {
    console.log('start')
    NProgress.start();
    const axiosConfig = config;
    return axiosConfig;
  },
  error => {
    NProgress.done();
    return Promise.reject(error)
  }
);

// service.interceptors.response.use(({ data, code, message }) => {
service.interceptors.response.use(({ data }) => {
  NProgress.done();
  const { code, message } = data;
  if (code === 403) {
    router.replace({ path: '/login' });
  }
  if (code !== 200) {
    ElNotification({
      type: 'error',
      title: 'error',
      message: message || 'Error!',
    });
    return Promise.reject(message || 'error');
  }
  return data;
});

export function getRequest(url: string, data: object) {
  // 过滤data中的函数
  const reqData = JSON.parse(JSON.stringify(data));
  // return service.get(url, { headers: { 'Content-type': 'application/json' }, params: reqData });
  return service.get(url, { params: reqData });
}

export function postRequest(url: string, data: object) {
  return service.post(url, data);
}

export function deleteRequest(url: string, data: object) {
  // 过滤data中的函数
  const reqData = JSON.parse(JSON.stringify(data));
  return service.delete(url, { params: reqData });
}

const axiosMap = new Map([['get', getRequest], ['post', postRequest], ['delete', deleteRequest]]);

export function requestPromise(url: string, method: string, data: object, formatFunction: string, showMessage: boolean) {
  const request = axiosMap.get(method);
  const reqData = formatRequest(formatFunction, data);
  return new Promise((resolve, reject) => {
    // const loading = message.loading('请稍等...', 0);
    request && request(url, reqData)
      .then((res) => {
        // loading();
        if (showMessage) {
          ElMessage[res.code === 200 ? 'success' : 'error']((res.message as string));
        }
        resolve(formatResponse(formatFunction, res));
      })
      .catch((err) => {
        reject(err);
      });
  });
}

export function graphql(url: string, method: string, data: object, query: string, showMessage: boolean) {
  const request = axiosMap.get(method);
  return new Promise((resolve, reject) => {
    request && request(url, { query }).then((res) => {
      if (showMessage) {
        ElMessage[res.code === 200 ? 'success' : 'error']((res.message as string));
      }
      resolve(res);
    })
  })
}

// export default service;
