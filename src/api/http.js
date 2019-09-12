/**
 * 对axios进行封装
 */
import axios from 'axios';
import store from '../store/index';

const instance = axios.create({
  timeout: 1000 * 10,
});
instance.defaults.headers.post['Content-type'] = 'application/json';

instance.interceptors.request.use(
  (config) => {
    const { token } = store.user;
    const newConfig = config;
    token && (newConfig.headers.token = token);
    return newConfig;
  },
  error => Promise.error(error),
);
instance.interceptors.response.use(
  res => (res.status === 200 ? Promise.resolve(res) : Promise.reject(res)),
  (error) => {
    const { response } = error;
    console.log(response.status);
    return Promise.reject(response);
  },
);

export default instance;
