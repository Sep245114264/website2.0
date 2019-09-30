import user from './user';
import request from '@/utils/request';

export default {
  ...user,
  getArticles(data) {
    return request({
      url: 'article/getArticles',
      method: 'get',
      params: { test: 'test' },
    });
  },
  postImage(data) {
    return request({
      url: 'http://localhost:3000/upload/image',
      method: 'post',
      data,
    });
  },
  postArticle(data) {
    return request({
      // url: 'upload/article',
      url: 'http://localhost:3000/upload/article',
      method: 'post',
      data,
    });
  },
  postRegister(data) {
    return request({
      url: '/user/signup',
      method: 'post',
      data,
    });
  }
};
