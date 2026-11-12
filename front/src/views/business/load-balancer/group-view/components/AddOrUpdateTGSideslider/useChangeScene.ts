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

import { Ref, watch } from 'vue';
// import stores
import { useLoadBalancerStore } from '@/store';
import { storeToRefs } from 'pinia';
import { TargetGroupOperationScene } from '@/constants';

export default (isShow: Ref<boolean>, formData: any) => {
  // use stores
  const loadBalancerStore = useLoadBalancerStore();
  const { updateCount, currentScene } = storeToRefs(loadBalancerStore);

  watch(isShow, (val) => {
    !val && (updateCount.value = 0);
  });

  // 当目标组的基本信息发生变更时, 记录更新次数
  watch(
    [
      () => formData.account_id,
      () => formData.name,
      () => formData.protocol,
      () => formData.port,
      () => formData.region,
      () => formData.cloud_vpc_id,
    ],
    () => {
      // 记录更新次数(只有更新目标组时才需要记录, 更新目标组的初始状态下, currentScene为null)
      if (currentScene.value) return;
      if (updateCount.value > 1) return;

      // 0->1, 回显目标组基本信息, 1->2, 更新目标组基本信息
      updateCount.value += 1;
      // 变更操作场景为 edit
      updateCount.value === 2 && loadBalancerStore.setCurrentScene(TargetGroupOperationScene.EDIT);
    },
    {
      deep: true,
    },
  );

  return {
    updateCount,
  };
};
