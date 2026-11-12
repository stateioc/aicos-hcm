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

import { Ref, computed } from 'vue';
import { useRoute } from 'vue-router';
import { useAccountStore } from '@/store';
import { getQueryStringParams, localStorageActions } from '@/common/util';
import { GLOBAL_BIZS_KEY } from '@/common/constant';

export const useWhereAmI = (): {
  whereAmI: Ref<Senarios>;
  isResourcePage: boolean;
  isBusinessPage: boolean;
  isServicePage: boolean;
  isSchemePage: boolean;
  getBusinessApiPath: () => string;
  getBizsId: () => number;
} => {
  const route = useRoute();
  const senario = computed(() => {
    if (!route) return;
    if (/^\/resource\/.+$/.test(route?.path)) return Senarios.resource;
    if (/^\/business\/.+$/.test(route.path)) return Senarios.business;
    if (/^\/service\/.+$/.test(route.path)) return Senarios.service;
    if (/^\/scheme\/.+$/.test(route.path)) return Senarios.scheme;
    if (/^\/bill\/.+$/.test(route.path)) return Senarios.bill;
    if (/^\/403\/.+$/.test(route.path)) return Senarios.unauthorized;
    return Senarios.unknown;
  });

  const getBizsId = () => {
    const { bizs } = useAccountStore();
    return Number(
      bizs || getQueryStringParams(GLOBAL_BIZS_KEY) || localStorageActions.get(GLOBAL_BIZS_KEY, (value) => value),
    );
  };

  /**
   * @returns 业务下需要拼接的 API 路径
   */
  const getBusinessApiPath = () => {
    return senario.value === Senarios.business ? `bizs/${getBizsId()}/` : '';
  };

  return {
    whereAmI: senario,
    isResourcePage: senario.value === Senarios.resource,
    isBusinessPage: senario.value === Senarios.business,
    isServicePage: senario.value === Senarios.service,
    isSchemePage: senario.value === Senarios.scheme,
    getBusinessApiPath,
    getBizsId,
  };
};

export enum Senarios {
  business = 'business',
  resource = 'resource',
  service = 'service',
  scheme = 'scheme',
  bill = 'bill',
  unknown = 'unknown',
  unauthorized = 'unauthorized',
}
