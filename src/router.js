import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';

import layout from '@/layout';

Vue.use(Router);

export const commonRouters = [
  {
    path: '/login',
    name: 'login',
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
        component: () => import('./views/dashboard'),
      },
    ],
  },
];
export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: commonRouters,
});

export const asyncRouters = [
  {
    path: '/',
    component: layout,
    name: '权限测试',
    meta: {
      role: ['admin', 'super_editor'],
    },
    children: [
      {
        path: 'permission',
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
