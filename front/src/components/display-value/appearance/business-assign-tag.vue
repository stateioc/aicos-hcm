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

const props = defineProps<{
  value: number | number[];
  displayValue: string;
}>();

const hasBusiness = computed(() => {
  if (Array.isArray(props.value) && props.value.length > 0) {
    return true;
  }
  if (!Array.isArray(props.value) && props.value) {
    return true;
  }
  return false;
});

const theme = computed(() => (hasBusiness.value ? 'success' : 'default'));

const tooltips = computed(() => {
  if (hasBusiness.value) {
    return { content: props.displayValue };
  }
  return { disabled: true };
});
</script>

<template>
  <bk-tag :theme="theme" v-bk-tooltips="tooltips">{{ hasBusiness ? displayValue : '未分配' }}</bk-tag>
</template>
