/*
 * SPACE-AICOS is pleased to support the open source community by making
 * SPACE-AICOS available.
 * Copyright (C) 2026 China Academy of Information and Communications Technology (CAICT).
 * All rights reserved.
 * Licensed under the MIT License (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at http://opensource.org/licenses/MIT
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on
 * an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND,
 * either express or implied. See the License for the
 * specific language governing permissions and limitations under the License.
 */

/**
 * 公告路由
 */

import type { RouteRecordRaw } from 'vue-router';

const common: RouteRecordRaw[] = [
  {
    path: '/:pathMatch(.*)',
    redirect: '/',
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/',
  },
  {
    path: '/*',
    redirect: '/',
  },
  {
    path: '/403/:id',
    name: '403',
    component: () => import('@/views/error-pages/403'),
    meta: {
      breadcrumb: ['申请权限'],
    },
  },
  //   {
  //     path: '/root',
  //     name: 'root',
  //     alias: '/',
  //     component: import('@/views/home/RootPath'),
  //   },
  //   {
  //     path: '/test',
  //     name: 'test',
  //     component: () => import('@/views/test/index'),
  //   },
  //   {
  //     path: '/exception',
  //     name: 'exception',
  //     component: () => import('@/views/exception'),
  //     meta: {
  //       isHideNav: true,
  //     },
  //   },
  //   {
  //     path: '/403',
  //     name: '403',
  //     component: () => import('@/views/403'),
  //   },
];
export default common;
