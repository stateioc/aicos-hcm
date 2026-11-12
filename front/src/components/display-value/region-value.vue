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
import { useRegionStore } from '@/store/region';
import { ResourceTypeEnum } from '@/common/resource-constant';

const props = defineProps<{
  value: string | string[];
  vendor: string;
  resourceType?: ResourceTypeEnum.CVM | ResourceTypeEnum.VPC | ResourceTypeEnum.DISK | ResourceTypeEnum.SUBNET;
}>();

const list = ref([]);

const localValue = computed(() => {
  return Array.isArray(props.value) ? props.value : [props.value];
});

const displayValue = computed(() => {
  const names = localValue.value.map((id) => {
    return list.value.find((item) => item.id === id)?.name;
  });
  return names?.join?.(', ');
});

const regionStore = useRegionStore();

watchEffect(async () => {
  if (props.vendor) {
    list.value = await regionStore.getRegionList({ vendor: props.vendor, resourceType: props.resourceType });
  }
});
</script>

<template>
  {{ displayValue }}
</template>
