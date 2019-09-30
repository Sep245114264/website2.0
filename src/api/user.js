import request from '@/utils/request';

const user = {
  login(data) {
    return request({
      url: '/user/login',
      method: 'post',
      data,
    });
  },
  logout() {
    return request({
      url: '/user/logout',
      method: 'get',
    });
  },
  getInfo(token) {
    return request({
      url: '/user/info',
      method: 'get',
      params: { token },
    });
  },
};

export default user;
