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
import Meta from '@/router/meta';
import { MENU_BUSINESS_TASK_MANAGEMENT, MENU_BUSINESS_TASK_MANAGEMENT_DETAILS } from '@/constants/menu-symbol';

export default [
  {
    name: MENU_BUSINESS_TASK_MANAGEMENT,
    path: 'task/:resourceType?',
    component: () => import('./index.vue'),
    meta: {
      ...new Meta({
        title: '任务管理',
        activeKey: MENU_BUSINESS_TASK_MANAGEMENT,
        // 没有业务访问权限不会展示侧边栏导航，这里只是做一个权限优化的占位提示
        auth: {
          view: { type: 'biz_access' },
        },
        menu: {
          relative: MENU_BUSINESS_TASK_MANAGEMENT,
        },
        icon: 'hcm-icon bkhcm-icon-bushu',
      }),
    },
  },
  {
    name: MENU_BUSINESS_TASK_MANAGEMENT_DETAILS,
    path: 'task/:resourceType?/details/:id',
    component: () => import('./details/index.vue'),
    meta: {
      ...new Meta({
        title: '任务详情',
        notMenu: true,
        activeKey: MENU_BUSINESS_TASK_MANAGEMENT,
        isShowBreadcrumb: true,
        menu: {
          relative: MENU_BUSINESS_TASK_MANAGEMENT,
        },
      }),
    },
  },
] as RouteRecordRaw[];
