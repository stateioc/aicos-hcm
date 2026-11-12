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

import { ref } from 'vue';
import { defineStore } from 'pinia';
import { resolveApiPathByBusinessId } from '@/common/util';
import http from '@/http';
import { enableCount } from '@/utils/search';
import type { IListResData } from '@/typings';
import { ILoadBalanceDeviceCondition } from '@/views/load-balancer/device/typing';

export const useLoadBalancerCountStore = defineStore('load-balancer-count', () => {
  const getCountLoading = ref(false);
  const getCount = async (condition: ILoadBalanceDeviceCondition, businessId: number) => {
    getCountLoading.value = true;
    const { vendor } = condition;
    const listener = resolveApiPathByBusinessId(
      '/api/v1/cloud',
      `vendors/${vendor}/listeners/by_topo/list`,
      businessId,
    );
    const url = resolveApiPathByBusinessId('/api/v1/cloud', `vendors/${vendor}/url_rules/by_topo/list`, businessId);
    const rs = resolveApiPathByBusinessId('/api/v1/cloud', `vendors/${vendor}/targets/by_topo/count`, businessId);
    try {
      const res = await Promise.all<
        [Promise<IListResData<any[]>>, Promise<IListResData<any[]>>, Promise<IListResData<any[]>>]
      >([
        http.post(listener, enableCount(condition, true)),
        http.post(url, enableCount(condition, true)),
        http.post(rs, enableCount(condition, true)),
      ]);
      const [listenerCount, urlCount, rsCount] = res.map((res) => res.data.count);

      return { listenerCount, urlCount, rsCount };
    } catch (error) {
      console.error(error);
      return Promise.reject(error);
    } finally {
      getCountLoading.value = false;
    }
  };

  return {
    getCountLoading,
    getCount,
  };
});
