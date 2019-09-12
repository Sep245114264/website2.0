import Vue from 'vue';
import Router from 'vue-router';

import layout from '@/layout';

Vue.use(Router);

export const commonRouters = [
  {
    path: '/login',
    name: 'login',
    hidden: true,
    meta: {
      title: '登录',
    },
    component: () => import('./views/Login.vue'),
  },
  {
    path: '/',
    component: layout,
    redirect: '/dashboard',
    meta: {
      title: 'test',
    },
    children: [
      {
        path: 'dashboard',
        name: 'dashboard',
        meta: {
          title: '首页',
        },
        component: () => import('./views/dashboard/index'),
      },
      // {
      //   path: 'manageUser',
      //   name: 'manageUser',
      //   meta: {
      //     title: '用户管理',
      //     role: ['editor'],
      //   },
      //   component: () => import('./views/ManageUser'),
      // },
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
  routes: commonRouters,
});

export const asyncRouters = [
  {
    path: '/manageArticle',
    name: '文章管理',
    meta: {
      title: '文章管理',
      role: ['admin'],
    },
    component: layout,
    children: [
      {
        path: '',
        component: () => import('./views/ManageArticle'),
        hidden: true,
      },
      {
        path: 'articleEdit',
        name: 'articleEdit',
        meta: {
          title: '编辑文章',
        },
        component: () => import('./views/ArticleEdit'),
        hidden: true,
      },
    ],
    // component: () => import('./views/ManageArticle'),
  },
  // {
  //   path: '/',
  //   component: layout,
  //   redirect: '/dashboard',
  //   meta: {
  //     // title: 'test',
  //     role: ['admin', 'editor'],
  //   },
  //   children: [
  //     {
  //       path: 'dashboard',
  //       name: 'dashboard',
  //       meta: {
  //         title: '首页',
  //         role: ['admin', 'editor'],
  //       },
  //       component: () => import('./views/dashboard/index'),
  //     },
  //     {
  //       path: 'manageArticle',
  //       name: '文章管理',
  //       meta: {
  //         title: '文章管理',
  //         role: ['admin', 'editor'],
  //       },
  //       component: () => import('./views/ManageArticle'),
  //     },
  //     {
  //       path: 'manageUser',
  //       name: 'manageUser',
  //       meta: {
  //         title: '用户管理',
  //         role: ['admin'],
  //       },
  //       component: () => import('./views/ManageUser'),
  //     },
  //     {
  //       path: 'permission',
  //       name: 'permission',
  //       meta: {
  //         title: '权限测试',
  //         role: ['admin', 'editor'],
  //       },
  //       children: [
  //         {
  //           path: 'page',
  //           name: 'page',
  //           meta: {
  //             title: '测试页面',
  //             role: ['admin'],
  //           },
  //           component: () => import('./views/permission'),
  //         },
  //         {
  //           path: 'role',
  //           name: 'role',
  //           meta: {
  //             title: '测试用户',
  //             role: ['editor'],
  //           },
  //           component: () => import('./views/permission'),
  //         },
  //       ],
  //     },
  {
    path: '*',
    redirect: '/404',
    hidden: true,
  },
];
// {
//   path: '/permission',
//   component: layout,
//   redirect: '/permission/page',
//   name: '权限测试',
//   meta: {
//     title: '权限测试',
//     // role: ['admin', 'super_editor'],
//   },
//   children: [
//     {
//       path: 'page',
//       component: () => import('./views/permission'),
//       name: 'permission',
//       meta: {
//         title: '页面',
//         role: ['admin', 'editor'],
//       },
//     },
//     {
//       path: 'role',
//       component: () => import('./views/permission'),
//       name: 'role',
//       meta: {
//         title: '用户',
//         role: ['admin'],
//       },
//     },
//   ],
// },
