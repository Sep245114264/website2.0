/**
 * 对axios进行封装
 */
import axios from 'axios';
import NProgress from 'nprogress';

const instance = axios.create({
  timeout: 1000 * 10,
});
instance.defaults.headers.post['Content-type'] = 'application/json';
// instance.defaults.withCredentials = true;

instance.interceptors.request.use(
  (config) => {
    // const { token } = store.user;
    const newConfig = config;
    console.log('start')
    NProgress.start();
    // token && (newConfig.headers.token = token);
    return newConfig;
  },
  error => Promise.reject(error),
);
instance.interceptors.response.use(
  res => {
    console.log(res)
    console.log('done')
    NProgress.done();
    return (res.status === 200 ? Promise.resolve(res) : Promise.reject(res))
  },
  // res => (res.status === 200 ? Promise.resolve(res) : Promise.reject(res)),
  (error) => {
    NProgress.done();
    const { response } = error;
    console.log(response.status);
    return Promise.reject(response);
  },
);

export default instance;
