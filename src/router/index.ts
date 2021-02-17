import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import layout from '@/layout/index.vue';

export const commonRouters: Array<RouteRecordRaw> = [
  {
    path: '/login',
    name: 'login',
    hidden: true,
    meta: {
      title: '登录',
    },
    component: () => import('@/Login.vue'),
  },
  {
    name: 'home',
    path: '/',
    component: () => import('@/layout/index.vue'),
    redirect: '/dashboard',
    meta: {
      title: 'test',
    },
    children: [
      {
        path: '/dashboard',
        name: 'dashboard',
        meta: {
          title: '首页',
        },
        component: () => import('@/views/dashboard/index.vue'),
      },
      // {
      //   path: '/manageUser',
      //   name: 'manageUser',
      //   meta: {
      //     title: '用户管理',
      //     role: ['editor'],
      //   },
      //   component: () => import('@/views/ManageUser/index.vue'),
      // },
    ]
  },
  {
    path: '/404',
    component: () => import('@/views/errorPage/404.vue'),
    hidden: true,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes: commonRouters,
})

export const asyncRouters = [
  {
    path: '/manageArticle',
    name: 'manageArticle',
    redirect: '/manageArticle',
    meta: {
      title: '文章管理',
      role: ['admin', 'editor'],
    },
    component: () => import('@/layout/index.vue'),
    children: [
      {
        path: '',
        component: () => import('@/views/ManageArticle/index.vue'),
        hidden: true,
      },
      {
        path: 'articleEdit',
        name: 'articleEdit',
        meta: {
          title: '编辑文章',
        },
        component: () => import('@/views/ArticleEdit/index.vue'),
        hidden: true,
      },
    ],
    // component: () => import('./views/ManageArticle'),
  },
  {
    path: '/manageColumns',
    name: 'manageColumns',
    redirect: '/manageColumns',
    meta: {
      title: '类别管理',
      role: ['editor'],
    },
    component: () => import('@/layout/index.vue'),
    children: [
      {
        path: '',
        component: () => import('@/views/ManageColumns/index.vue'),
        hidden: true,
      },
    ],
  },
  // {
  //   path: /.*/,
  //   redirect: '/404',
  //   hidden: true,
  // },
]

export default router
