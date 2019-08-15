import Vue from 'vue';
import Element from 'element-ui';
import App from './App.vue';
import router from './router';
import store from './store';
import 'normalize.css/normalize.css';
import '@/style/index.scss';
import 'element-ui/lib/theme-chalk/index.css';
import '../mock';
import '@/icons';

Vue.use(Element);
Vue.config.productionTip = false;

const whiteList = ['/login'];
router.beforeEach(async (to, from, next) => {
  console.log(to.path);
  if (store.state.user.token) {
    console.log(to.path);
    if (to.path === '/login') {
      next({ path: '/' });
    } else {
      if (store.state.user.roles.length === 0) {
        try {
          const { roles } = await store.dispatch('user/getInfo');
          const accessRoutes = await store.dispatch('permission/generateRoutes', roles);
          router.addRoutes(accessRoutes);
          console.log(accessRoutes);
          next({ ...to, replace: true });
        } catch (error) {
          console.log(error);
        }
      } else {
        console.log(to.path);
        next();
      }
    }
  } else {
    if (whiteList.includes(to.path)) {
      next();
    } else {
      next({ path: '/login' });
    }
  }
});

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
