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
import { computed } from 'vue';
import { AppearanceType, DisplayType } from './typings';
import { useBusinessGlobalStore } from '@/store/business-global';

import BusinessAssignTag from './appearance/business-assign-tag.vue';

const props = defineProps<{ value: number | number[]; separator?: string; display?: DisplayType }>();

const businessGlobalStore = useBusinessGlobalStore();

const appearance = computed(() => props.display?.appearance);

const appearanceComps: Partial<Record<AppearanceType, any>> = {
  'business-assign-tag': BusinessAssignTag,
};

const displayValue = computed(() => {
  const values = Array.isArray(props.value) ? props.value : [props.value];
  const names = [];
  for (const value of values) {
    const name = businessGlobalStore.businessFullList.find((item) => item.id === value)?.name;
    names.push(name);
  }
  return names?.join?.(props.separator || ', ') || '--';
});
</script>

<template>
  <template v-if="!appearance">
    <bk-overflow-title resizeable type="tips" v-if="display?.showOverflowTooltip">{{ displayValue }}</bk-overflow-title>
    <span v-else>{{ displayValue }}</span>
  </template>
  <component v-else :is="appearanceComps[appearance]" :display-value="displayValue" :value="value" />
</template>
