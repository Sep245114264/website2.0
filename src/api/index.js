// import vue from 'vue';
import user from './user';
import { postRequest, requestPromise, graphql } from '@/utils/request';
import { inject } from 'vue';

// const baseUrl = 'http://sepveneto.top:3000/';
const baseUrl = '';

export function useApi() {
  return inject('api');
}

export default {
  ...user,
  getArticles(data) {
    return requestPromise(`${baseUrl}article/getArticles`, 'get', data, 'getArticles');
  },
  postImage(data) {
    return requestPromise(`${baseUrl}upload/image`, 'post', data, 'postImage');
  },
  getArticle(id) {
    return requestPromise(`${baseUrl}article`, 'get', { id }, 'getArticle');
  },
  deleteArticle(data) {
    return requestPromise(`${baseUrl}article`, 'delete', data, 'deleteArticle', true);
  },
  postArticle(data) {
    return requestPromise(`${baseUrl}upload/article`, 'post', data, 'postArticle', true);
  },
  postRegister(data) {
    return requestPromise(`${baseUrl}user/signup`, 'post', data, 'postRegister');
  },
  getColumns() {
    // return graphql(`${baseUrl}/columns/list`, 'post', '', `{getColumns(name:'vv'){_id, name,color}}`);
    return graphql(`/api/getColumns`, 'post', '', {
      fields: ['_id', 'color', 'name']
    });
  },
};

const interfaces = {
  ...user,
  getArticles(data) {
    return requestPromise(`${baseUrl}article/getArticles`, 'get', data, 'getArticles');
  },
  postImage(data) {
    return requestPromise(`${baseUrl}upload/image`, 'post', data, 'postImage');
  },
  getArticle(id) {
    return requestPromise(`${baseUrl}article`, 'get', { id }, 'getArticle');
  },
  deleteArticle(data) {
    return requestPromise(`${baseUrl}article`, 'delete', data, 'deleteArticle', true);
  },
  postArticle(data) {
    return requestPromise(`${baseUrl}upload/article`, 'post', data, 'postArticle', true);
  },
  postRegister(data) {
    return requestPromise(`${baseUrl}user/signup`, 'post', data, 'postRegister');
  },
  getColumns() {
    return requestPromise(`${baseUrl}/columns`, 'get', '', 'getColumns');
  },
  postColumns(data) {
    return requestPromise(`${baseUrl}/columns`, 'post', data, 'postColumns', true);
  },
  getColumnList(data) {
    return requestPromise(`${baseUrl}/columns/list`, 'get', data, 'getColumnList');
  }
}

export const apiInstance = {
  install(app) {
    app.provide('api', interfaces);
  }
}
