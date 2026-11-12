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

import type { RouteRecordRaw, RouteLocationNormalized } from 'vue-router';
import Meta from '@/router/meta';
import {
  MENU_RESOURCE,
  MENU_BUSINESS_OPERATION_LOG,
  MENU_BUSINESS_OPERATION_LOG_DETAILS,
  MENU_RESOURCE_OPERATION_LOG,
  MENU_RESOURCE_OPERATION_LOG_DETAILS,
} from '@/constants/menu-symbol';

const _removeQueryParams = (to: RouteLocationNormalized) => {
  if (Object.keys(to.query).length) return { path: to.path, query: {} };
};

const operationLogBiz: RouteRecordRaw[] = [
  {
    name: MENU_BUSINESS_OPERATION_LOG,
    path: 'record',
    component: () => import('@/views/operation-log/entry-biz.vue'),
    meta: {
      ...new Meta({
        title: '操作记录',
        activeKey: MENU_BUSINESS_OPERATION_LOG,
        isShowBreadcrumb: true,
        menu: {},
        icon: 'hcm-icon bkhcm-icon-operation-record',
      }),
    },
  },
  {
    name: MENU_BUSINESS_OPERATION_LOG_DETAILS,
    path: 'record/details',
    component: () => import('@/views/operation-log/details/flow-task/index'),
    meta: {
      ...new Meta({
        title: '操作记录详情',
        notMenu: true,
        activeKey: MENU_BUSINESS_OPERATION_LOG,
        isShowBreadcrumb: false,
        menu: {
          relative: MENU_BUSINESS_OPERATION_LOG_DETAILS,
        },
      }),
    },
  },
];

const operationLogRsc: RouteRecordRaw[] = [
  {
    name: MENU_RESOURCE_OPERATION_LOG,
    path: 'record',
    component: () => import('@/views/operation-log/entry-rsc.vue'),
    meta: {
      ...new Meta({
        owner: MENU_RESOURCE,
        title: '操作记录',
        activeKey: MENU_RESOURCE_OPERATION_LOG,
        menu: {},
      }),
    },
    // beforeEnter: removeQueryParams,
  },
  {
    name: MENU_RESOURCE_OPERATION_LOG_DETAILS,
    path: 'record/details',
    component: () => import('@/views/operation-log/details/flow-task/index'),
    meta: {
      ...new Meta({
        title: '操作记录详情',
        notMenu: true,
        activeKey: MENU_RESOURCE_OPERATION_LOG,
        isShowBreadcrumb: false,
        menu: {
          relative: MENU_RESOURCE_OPERATION_LOG,
        },
      }),
    },
  },
];

export { operationLogBiz, operationLogRsc };
