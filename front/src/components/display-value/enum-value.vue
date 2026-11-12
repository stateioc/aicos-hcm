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
import { computed, ref, watchEffect } from 'vue';
import { ModelProperty } from '@/model/typings';
import { AppearanceType, DisplayType } from './typings';
import Status from './appearance/status.vue';
import CvmStatus from './appearance/cvm-status.vue';
import ClbStatus from './appearance/clb-status.vue';
import DynamicStatus from './appearance/dynamic-status.vue';

const props = defineProps<{
  value: string | number | string[] | number[];
  option: ModelProperty['option'];
  display: DisplayType;
}>();

const localOption = ref<Record<string | number, any>>({});

watchEffect(async () => {
  if (typeof props.option === 'function') {
    localOption.value = await props.option();
  } else {
    localOption.value = props.option;
  }
});

const displayOn = computed(() => props.display?.on || 'cell');
const appearance = computed(() => props.display?.appearance);
const appearanceProps = computed(() => props.display?.appearanceProps);

const displayValue = computed(() => {
  const vals = Array.isArray(props.value) ? props.value : [props.value];
  return vals.map((val) => localOption.value?.[val] || val).join(', ') || '--';
});

const appearanceComps: Partial<Record<AppearanceType, any>> = {
  status: Status,
  'cvm-status': CvmStatus,
  'clb-status': ClbStatus,
  'dynamic-status': DynamicStatus,
};
</script>

<template>
  <component
    :is="appearanceComps[appearance]"
    v-if="appearance"
    :display-value="displayValue"
    :display-on="displayOn"
    :value="value"
    :option="option"
    v-bind="appearanceProps"
  />
  <span v-else>{{ displayValue }}</span>
</template>
