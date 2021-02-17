import router from '@/router';
import store from '@/store';
import { RouteRecordRaw } from 'vue-router';
const WHITELIST = ['/login'];
let init = false;
router.beforeEach(async (to, from, next) => {
  // const token = localStorage.getItem('token');
  if (WHITELIST.includes(to.path)) {
    next();
  } else {
    // const { roles } = store.state.user;
    if (!init) {
      // try {
      const userInfo = await store.dispatch('user/getInfo');
      init = true;
      store.commit('permission/generateRoutes', userInfo.roles);
      (store.state.permission.addRoutes as RouteRecordRaw[]).forEach(item => {
        router.addRoute(item);
      })
      // router.matcher = newRouter.matcher;
      // if (router.currentRoute.name !== 'dashboard') {
      //   router.replace(to.path);
      // }
      // console.log('fresh: ', 'to: ', to.path, 'from: ', from.path);
      // router.currentRoute.name !== 'login' && next(to);
      next(to);
      // } catch (error) {
      //   console.log(error);
      // }
    } else {
      // console.log('jump: ', 'to: ', to.path, 'from: ', from.path);
      next();
    }
  }
});
