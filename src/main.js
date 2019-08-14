import Vue from 'vue';
import Element from 'element-ui';
import App from './App.vue';
import router from './router';
import store from './store';
import 'normalize.css/normalize.css';
import 'element-ui/lib/theme-chalk/index.css';
import '../mock';

Vue.use(Element);
Vue.config.productionTip = false;

console.log(store);
router.beforeEach(async (to, from, next) => {
  if (store.state.user.token) {
    if (to.path === '/login') {
      next();
    } else {
      const a = 1;
      console.log(store.state.user.roles);
      if (store.state.user.roles.length === 0) {
        const { roles } = await store.dispatch('user/getInfo');
        const accessRoutes = await store.dispatch('permission/generateRoutes', roles);
        router.addRoutes(accessRoutes);
        console.log(to);
        next({ ...to, replace: true });
      } else {
        next();
      }
    }
  } else {
    next('/login');
  }
});

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
