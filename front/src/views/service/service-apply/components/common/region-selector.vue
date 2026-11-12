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
import { computed, ref, useAttrs, watchEffect } from 'vue';
import { IRegionItem, useRegionStore } from '@/store/region';
import { ResourceTypeEnum } from '@/common/resource-constant';

defineOptions({ name: 'hcm-form-region' });

const model = defineModel<string | string[]>();
const props = defineProps<{
  vendor: string;
  resourceType?: ResourceTypeEnum.CVM | ResourceTypeEnum.VPC | ResourceTypeEnum.DISK | ResourceTypeEnum.SUBNET;
  multiple?: boolean;
  clearable?: boolean;
  disabled?: boolean;
}>();
const attrs = useAttrs();

const localModel = computed({
  get() {
    if (props.multiple && model.value && !Array.isArray(model.value)) {
      return [model.value];
    }
    return model.value;
  },
  set(val) {
    model.value = val;
  },
});

const regionStore = useRegionStore();
const list = ref<IRegionItem[]>([]);
watchEffect(async () => {
  if (props.vendor) {
    list.value = await regionStore.getRegionList({ vendor: props.vendor, resourceType: props.resourceType });
  } else {
    list.value = [];
  }
});
</script>

<template>
  <bk-select
    v-model="localModel"
    :list="list"
    :clearable="clearable"
    :disabled="disabled"
    :multiple="multiple"
    :multiple-mode="multiple ? 'tag' : 'default'"
    :id-key="'id'"
    :display-key="'name'"
    :loading="regionStore.regionListLoading"
    v-bind="attrs"
  />
</template>
