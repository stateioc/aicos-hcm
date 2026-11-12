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
 * 服务模块除了侧边栏的内部导航
 */
import type { RouteRecordRaw } from 'vue-router';

const serviceInside: RouteRecordRaw[] = [
  {
    path: '/service/service-apply/account-add',
    name: 'applyAccount',
    component: () => import('@/views/service/service-apply/account-add/index'),
    meta: {
      backRouter: -1,
      activeKey: 'serviceApply',
      breadcrumb: ['服务', '服务申请', '账号'],
    },
  },
  // {
  //   path: '/service/service-apply/cvm',
  //   name: 'applyCvm',
  //   component: () => import('@/views/service/service-apply/cvm'),
  //   meta: {
  //     backRouter: -1,
  //     activeKey: 'serviceApply',
  //     breadcrumb: ['服务', '服务申请', '主机'],
  //   },
  // },
  // {
  //   path: '/service/service-apply/vpc',
  //   name: 'applyVPC',
  //   component: () => import('@/views/service/service-apply/vpc'),
  //   meta: {
  //     backRouter: -1,
  //     activeKey: 'serviceApply',
  //     breadcrumb: ['服务', '服务申请', 'VPC'],
  //   },
  // },
  // {
  //   path: '/service/service-apply/disk',
  //   name: 'applyDisk',
  //   component: () => import('@/views/service/service-apply/disk'),
  //   meta: {
  //     backRouter: -1,
  //     activeKey: 'serviceApply',
  //     breadcrumb: ['服务', '服务申请', '云硬盘'],
  //   },
  // },
];

export default serviceInside;
