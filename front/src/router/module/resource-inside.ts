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
 * 资源模块除了侧边栏的内部导航
 */
import type { RouteRecordRaw } from 'vue-router';

const resourceInside: RouteRecordRaw[] = [
  {
    path: '/resource/account/add',
    name: 'accountAdd',
    component: () => import('@/views/resource/accountmanage/account-add'),
    meta: {
      backRouter: -1,
      activeKey: 'resourceAccount',
      breadcrumb: ['云管', '账号', '新增账号'],
    },
  },
  {
    path: '/resource/account/detail',
    name: 'accountDetail',
    component: () => import('@/views/resource/accountmanage/account-detail'),
    meta: {
      backRouter: -1,
      activeKey: 'resourceAccount',
      breadcrumb: ['云管', '账号', '详情'],
    },
  },
];

export default resourceInside;
