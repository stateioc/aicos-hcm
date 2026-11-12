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
import i18n from '@/language/i18n';
import Meta from '@/router/meta';
import { MENU_SERVICE_TICKET_DETAILS, MENU_SERVICE_TICKET_MANAGEMENT } from '@/constants/menu-symbol';

const { t } = i18n.global;

export const ticketRoutes: RouteRecordRaw[] = [
  // 兼容老路由
  {
    path: '/service/my-apply',
    redirect: '/service/ticket',
    meta: { ...new Meta({ notMenu: true }) },
  },
  {
    path: '/service/my-apply/detail',
    redirect: '/service/ticket/detail',
    meta: { ...new Meta({ notMenu: true }) },
  },
  {
    path: 'ticket',
    name: MENU_SERVICE_TICKET_MANAGEMENT,
    component: () => import('@/views/ticket/entry-srv.vue'),
    meta: {
      ...new Meta({
        activeKey: MENU_SERVICE_TICKET_MANAGEMENT,
        title: t('单据管理'),
        isShowBreadcrumb: true,
        icon: 'hcm-icon bkhcm-icon-my-apply',
      }),
    },
  },
  {
    path: 'ticket/detail',
    name: MENU_SERVICE_TICKET_DETAILS,
    component: () => import('@/views/ticket/children/apply-detail'),
    meta: {
      ...new Meta({
        activeKey: MENU_SERVICE_TICKET_MANAGEMENT,
        notMenu: true,
      }),
    },
  },
];
