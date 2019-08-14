import { asyncRouters, commonRouters } from '@/router';

const state = {
  routes: [],
  addRoutes: [],
};

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes;
    state.routes = commonRouters.concat(routes);
  },
};

const actions = {
  generateRoutes({ commit }, roles) {
    return new Promise((resolve, reject) => {
      let accessRoutes = [];
      if (roles.includes('admin')) {
        accessRoutes = asyncRouters || [];
      } else {
        accessRoutes = [];
      }
      commit('SET_ROUTES', accessRoutes);
      resolve(accessRoutes);
    });
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
