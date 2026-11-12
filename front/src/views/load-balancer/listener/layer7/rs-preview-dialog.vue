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
import { ITargetGroupDetails, useLoadBalancerTargetGroupStore } from '@/store/load-balancer/target-group';

import Search from '../../children/search/search.vue';
import RsPreviewTable from '../children/rs-preview-table.vue';
import { ConditionKeyType, SearchConditionFactory } from '../../children/search/condition-factory';
import { ISearchSelectValue } from '@/typings';
import { getLocalFilterFnBySearchSelect } from '@/utils/search';

interface IProps {
  targetGroupId: string;
}

const model = defineModel<boolean>();
const props = defineProps<IProps>();

const loadBalancerTargetGroupStore = useLoadBalancerTargetGroupStore();

const currentGlobalBusinessId = inject<Ref<number>>('currentGlobalBusinessId');

const conditionProperties = SearchConditionFactory.createModel(ConditionKeyType.RS).getProperties();

const searchValue = ref<ISearchSelectValue>([]);
const list = ref<ITargetGroupDetails['target_list']>([]);
const displayList = computed(() => {
  return list.value.filter(getLocalFilterFnBySearchSelect(searchValue.value));
});

onMounted(async () => {
  const details = await loadBalancerTargetGroupStore.getTargetGroupDetails(
    props.targetGroupId,
    currentGlobalBusinessId.value,
  );
  list.value = details.target_list;
});

const handleSearch = (v: ISearchSelectValue) => {
  searchValue.value = v;
};
</script>

<template>
  <bk-dialog v-model:is-show="model" title="预览目标组RS信息" :width="960" dialog-type="show" class="rs-preview-dialog">
    <search class="mb16" :fields="conditionProperties" @search="handleSearch" />
    <RsPreviewTable :list="displayList" :loading="loadBalancerTargetGroupStore.targetGroupDetailsLoading" />
  </bk-dialog>
</template>

<style scoped lang="scss"></style>
