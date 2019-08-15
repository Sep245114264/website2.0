import Vue from 'vue';
import Router from 'vue-router';

import layout from '@/layout';

Vue.use(Router);

export const commonRouters = [
  {
    path: '/login',
    name: 'login',
    meta: {
      title: '登录',
    },
    component: () => import('./views/Login.vue'),
  },
  {
    path: '/',
    redirect: '/dashboard',
    component: layout,
    children: [
      {
        path: 'dashboard',
        name: 'dashboard',
        meta: {
          title: '首页',
        },
        component: () => import('./views/dashboard/index'),
      },
    ],
  },
  {
    path: '/404',
    component: () => import('./views/errorPage/404'),
    hidden: true,
  },
];
export default new Router({
  mode: 'history',
  // base: process.env.BASE_URL,
  routes: commonRouters,
});

export const asyncRouters = [
  {
    path: '/permission',
    component: layout,
    redirect: '/permission/page',
    name: '权限测试',
    meta: {
      role: ['admin', 'super_editor'],
    },
    children: [
      {
        path: 'page',
        component: () => import('./views/permission'),
        name: 'permission',
        meta: {
          role: ['admin', 'super_editor'],
        },
      },
    ],
  },
  {
    path: '*',
    redirect: '/404',
    hidden: true,
  },
];
