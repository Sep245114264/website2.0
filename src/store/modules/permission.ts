import router, { asyncRouters, commonRouters } from '@/router';
import { RouteRecordRaw } from 'vue-router'
import { ActionContext } from 'vuex';
/**
 * 判断当前角色在当前路由有没有权限
 * @param {object} routes 当前路由
 * @param {Array} roles 当前角色
 */
function hasPermission(routes: RouteRecordRaw, roles: string) {
  if (routes.meta && routes.meta.role) {
    // return roles.some(role => routes.meta.role.includes(role));
    return routes.meta.role.includes(roles);
  }
  return true;
}

/**
 * 针对不同的用户角色，过滤路由
 * @param {Array} routes 待过滤的路由
 * @param {Array} roles 用户的角色
 */
function filterAsyncRouters(routes: RouteRecordRaw[], roles: string) {
  const res: RouteRecordRaw[] = [];
  routes && routes.forEach((route) => {
    const temp = { ...route };
    if (hasPermission(route, roles)) {
      if (temp.children) {
        temp.children = filterAsyncRouters(temp.children, roles);
      }
      res.push(temp);
    }
  });
  return res;
}

interface State {
  routes: RouteRecordRaw[];
  addRoutes: RouteRecordRaw[];
}

const state: State = {
  routes: [],
  addRoutes: [],
};

const mutations = {
  SET_ROUTES: (state: State, routes: RouteRecordRaw[]) => {
    const router = commonRouters.find(item => item.name === 'home');
    state.addRoutes = routes;
    if (router?.children) {
      state.routes = [...router.children?.values(), ...routes];
    }
    // state.routes = routes;
  },
  CLEAR_ROUTES: (state: State) => {
    state.routes = commonRouters;
  },
  generateRoutes(state: State, roles: string) {
    try {
      let accessRoutes: RouteRecordRaw[] = [];
      if (roles.includes('admin')) {
        accessRoutes = asyncRouters || [];
      } else {
        accessRoutes = filterAsyncRouters(asyncRouters, roles);
      }
      // commit('SET_ROUTES', accessRoutes);
      const home = commonRouters.find(item => item.name === 'home');
      const routes = accessRoutes;
      state.addRoutes = routes;
      console.log(state.addRoutes)
      if (home?.children) {
        state.routes = [...home.children?.values(), ...routes];
      }
      if (home?.children) {
        home.children = [...home.children, ...accessRoutes];
      }
      // router?.children && resolve({ ...router, children: [...router.children, ...accessRoutes] });
    } catch (error) {
    }
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  // actions,
};
