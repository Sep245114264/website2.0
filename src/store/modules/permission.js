import { asyncRouters, commonRouters } from '@/router';
/**
 * 判断当前角色在当前路由有没有权限
 * @param {object} routes 当前路由
 * @param {Array} roles 当前角色
 */
function hasPermission(routes, roles) {
  if (routes.meta && routes.meta.role) {
    return roles.some(role => routes.meta.role.includes(role));
  }
  return true;
}

/**
 * 针对不同的用户角色，过滤路由
 * @param {Array} routes 待过滤的路由
 * @param {Array} roles 用户的角色
 */
function filterAsyncRouters(routes, roles) {
  console.log('enter');
  const res = [];
  routes.forEach((route) => {
    const temp = { ...route };
    if (hasPermission(route, roles)) {
      if (temp.children) {
        temp.children = filterAsyncRouters();
      }
      res.push(temp);
    }
  });
  return res;
}

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
        accessRoutes = filterAsyncRouters(asyncRouters, roles);
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
