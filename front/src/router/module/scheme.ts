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

import type { RouteRecordRaw } from 'vue-router';

// 资源选型模块路由
const scheme: RouteRecordRaw[] = [
  {
    path: '/scheme',
    name: 'resource-scheme',
    component: () => import('@/views/scheme/index'),
    children: [
      {
        path: 'recommendation',
        name: 'scheme-recommendation',
        component: () => import('@/views/scheme/scheme-recommendation/index'),
        meta: {
          notMenu: true,
        },
      },
      {
        path: 'deployment/list',
        name: 'scheme-list',
        component: () => import('@/views/scheme/scheme-list/index'),
        meta: {
          notMenu: true,
        },
      },
      {
        path: 'deployment/detail',
        name: 'scheme-detail',
        component: () => import('@/views/scheme/scheme-detail/index'),
        meta: {
          notMenu: true,
        },
      },
    ],
  },
];

export default scheme;
