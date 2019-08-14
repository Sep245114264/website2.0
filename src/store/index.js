import Vue from 'vue';
import Vuex from 'vuex';
import user from './modules/user';

Vue.use(Vuex);
const test = {
  state: {},
  mutation: {},
  actions: {},
};

console.log(user);
const store = new Vuex.Store({
  modules: { user, test },
});
export default store;
