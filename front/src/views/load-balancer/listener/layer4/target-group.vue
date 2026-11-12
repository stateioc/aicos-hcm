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
import { computed, inject, onMounted, Ref, ref } from 'vue';
import { IListenerItem } from '@/store/load-balancer/listener';
import { ITargetGroupDetails, useLoadBalancerTargetGroupStore } from '@/store/load-balancer/target-group';
import { BindingStatusType } from '../../constants';
import routerAction from '@/router/utils/action';

import CopyToClipboard from '@/components/copy-to-clipboard/index.vue';
import Panel from '@/components/panel';
import RsPreviewTable from '../children/rs-preview-table.vue';
import { MENU_BUSINESS_TARGET_GROUP_DETAILS } from '@/constants/menu-symbol';
import { GLOBAL_BIZS_KEY } from '@/common/constant';

const props = defineProps<{ listenerRowData: IListenerItem }>();

const loadBalancerTargetGroupStore = useLoadBalancerTargetGroupStore();

const currentGlobalBusinessId = inject<Ref<number>>('currentGlobalBusinessId');

const targetGroupDetails = ref<ITargetGroupDetails>();
const getTargetGroupDetails = async () => {
  targetGroupDetails.value = await loadBalancerTargetGroupStore.getTargetGroupDetails(
    props.listenerRowData.target_group_id,
    currentGlobalBusinessId.value,
  );
};

onMounted(() => {
  props.listenerRowData.target_group_id && getTargetGroupDetails();
});

const displaySimpleInfo = computed(() => {
  const { name, protocol, port } = targetGroupDetails.value ?? {};
  return targetGroupDetails.value ? `${name} (${protocol} : ${port})` : '--';
});
const isDisplaySimpleInfoLoading = computed(
  () =>
    loadBalancerTargetGroupStore.targetGroupDetailsLoading ||
    props.listenerRowData.binding_status === BindingStatusType.BINDING,
);

const jumpToTargetGroupDetails = () => {
  const { id, vendor } = targetGroupDetails.value;
  routerAction.open({
    name: MENU_BUSINESS_TARGET_GROUP_DETAILS,
    params: { id },
    query: { [GLOBAL_BIZS_KEY]: currentGlobalBusinessId.value, type: 'detail', vendor },
  });
};
</script>

<template>
  <div class="target-group-container">
    <div class="simple-info">
      目标组：
      <bk-loading v-if="isDisplaySimpleInfoLoading" size="mini" mode="spin" theme="primary" loading></bk-loading>
      <template v-else>
        <bk-button theme="primary" text @click="jumpToTargetGroupDetails">{{ displaySimpleInfo }}</bk-button>
        <copy-to-clipboard class="ml4" :content="displaySimpleInfo" />
      </template>
    </div>
    <panel title="RS 信息" no-shadow>
      <rs-preview-table
        :loading="loadBalancerTargetGroupStore.targetGroupDetailsLoading"
        :list="targetGroupDetails?.target_list"
        :small-pagination="false"
      />
    </panel>
  </div>
</template>

<style scoped lang="scss">
.target-group-container {
  .simple-info {
    margin-bottom: 16px;
    display: flex;
    align-items: center;
  }
}
</style>
