import Vue from 'vue';
import Element from 'element-ui';
import App from './App.vue';
import router from './router';
import store from './store';
import api from './api';
import 'normalize.css/normalize.css';
import '@/style/index.scss';
import 'element-ui/lib/theme-chalk/index.css';
// import { mockXHR } from '../mock/index';
import '@/icons';

// mockXHR();

Vue.use(Element);
Vue.config.productionTip = false;
Vue.prototype.$api = api;

Vue.directive('checkForm', {
  inserted(el, binding, vNode) {
    el.addEventListener('change', (event) => {
      el.value === ''
        ? (el.className += 'input-error')
        : el.className.replace('input-error', '').trim();
    });
  },
});

const whiteList = ['/login'];
router.beforeEach(async (to, from, next) => {
  const token = localStorage.getItem('token');
  if (token) {
    if (to.path === '/login') {
      next({ path: '/' });
    } else {
      const { roles } = store.state.user;
      if (roles.length === 0) {
        try {
          const res = await store.dispatch('user/getInfo');
          const accessRoutes = await store.dispatch('permission/generateRoutes', res.roles);
          router.addRoutes(accessRoutes);
          next({ ...to, replace: true });
        } catch (error) {
          console.log(error);
        }
      } else {
        next();
      }
    }
  } else {
    if (whiteList.includes(to.path)) {
      next();
    } else {
      next({ path: '/login' });
      // next();
    }
  }
});

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
