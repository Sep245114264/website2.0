import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const modulesNames = require.context('./modules', true, /\.js$/);
let modules = {};
modules = modulesNames.keys().reduce((module, name) => {
  const obj = module;
  const moduleName = /\.\/(.*)\.js$/.exec(name)[1];
  obj[moduleName] = modulesNames(name).default;
  return obj;
}, {});

const store = new Vuex.Store({
  // modules: { user, test },
  modules,
});
export default store;
