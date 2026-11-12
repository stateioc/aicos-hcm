<!--
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
-->

<script setup lang="ts">
import { ref, ComputedRef, inject } from 'vue';
import { ILoadBalanceDeviceCondition, ICount, DeviceTabEnum } from './typing';
import { VendorEnum } from '@/common/constant';
import DeviceCondition from './search/index.vue';
import MainContent from './main-content/index.vue';
import { useLoadBalancerDeviceSearchStore } from '@/store/load-balancer/device-search';
import routeQuery from '@/router/utils/query';

defineOptions({ name: 'device-search' });

const numberField = ['lbl_ports', 'target_ports'];

const loadBalancerDeviceSearchStore = useLoadBalancerDeviceSearchStore();

const currentGlobalBusinessId = inject<ComputedRef<number>>('currentGlobalBusinessId');

const condition = ref<ILoadBalanceDeviceCondition>({
  vendor: VendorEnum.TCLOUD,
  account_id: '',
});
const count = ref<ICount>({
  listenerCount: 0,
  urlCount: 0,
  rsCount: 0, // 总rs数
});

const countChange = ref(false); // 总数是否变化

const handleSave = async (newCondition: ILoadBalanceDeviceCondition) => {
  // 对数字类型转换
  Object.entries(newCondition).forEach(([label, value]) => {
    const isArray = Array.isArray(value);
    if (numberField.includes(label)) newCondition[label] = isArray ? value.map(Number) : Number(value);
  });
  try {
    const { listenerCount, urlCount, rsCount } = await loadBalancerDeviceSearchStore.getOverviewList(
      newCondition,
      currentGlobalBusinessId.value,
    );
    count.value = {
      listenerCount,
      urlCount,
      rsCount,
    };
  } catch (error) {
    console.error(error);
  } finally {
    condition.value = newCondition;
    routeQuery.set({
      _t: Date.now(),
    });
  }
};
const handleListDone = (
  from: DeviceTabEnum,
  params: { type: 'listenerCount' | 'urlCount' | 'rsCount'; data: Record<string, any> },
) => {
  const {
    type,
    data: { count: nowCount },
  } = params;
  if (nowCount !== count.value[type]) {
    countChange.value = true;
  }
};
const handleCountChange = (val: boolean) => {
  countChange.value = val;
};
</script>

<template>
  <bk-resize-layout class="device-search" :initial-divide="320" :min="320" immediate>
    <template #aside>
      <device-condition
        @save="handleSave"
        :loading="loadBalancerDeviceSearchStore.overviewListLoading"
        :count-change="countChange"
        @count-change="handleCountChange"
      ></device-condition>
    </template>
    <template #main>
      <main-content :condition="condition" :count="count" @list-data-loaded="handleListDone" />
    </template>
  </bk-resize-layout>
</template>

<style scoped lang="scss">
.device-search {
  height: 100%;
}
</style>
