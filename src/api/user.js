import { postRequest, getRequest, requestPromise } from '@/utils/request';

// const baseUrl = 'http://sepveneto.top:3000/';
const baseUrl = '';

const user = {
  login(data) {
    return requestPromise(`${baseUrl}user/login`, 'post', data, 'login');
  },
  logout() {
    return requestPromise(`${baseUrl}user/logout`, 'get', {}, 'logout');
  },
  getInfo(token) {
    return getRequest(`${baseUrl}user/info`, { token });
  },
};

export default user;
