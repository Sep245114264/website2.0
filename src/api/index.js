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
      url: 'upload/image',
      method: 'post',
      data,
    });
  },
  postArticle(data) {
    return request({
      // url: 'upload/article',
      url: 'http://sepveneto.top:3000/upload/article',
      method: 'post',
      data,
    });
  },
};
