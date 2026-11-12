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
import { computed, useAttrs } from 'vue';
import BusinessSelector from '@/components/business-selector/business.vue';
import { isEmpty } from '@/common/util';

defineOptions({ name: 'hcm-search-business' });

const props = withDefaults(
  defineProps<{
    multiple?: boolean;
    clearable?: boolean;
    filterable?: boolean;
    collapseTags?: boolean;
    showAll?: boolean;
    cacheKey?: string;
  }>(),
  {
    multiple: true,
    clearable: true,
    filterable: true,
    collapseTags: true,
    showAll: false,
  },
);

const model = defineModel<number | number[]>();

const localModel = computed({
  get() {
    if (props.multiple && model.value && !Array.isArray(model.value)) {
      return [model.value];
    }
    return model.value;
  },
  set(val) {
    // 操作本地缓存，如果是空数据则删除缓存
    if (props.cacheKey) {
      if (isEmpty(val)) {
        localStorage.removeItem(props.cacheKey);
      } else {
        localStorage.setItem(props.cacheKey, JSON.stringify(val));
      }
    }
    model.value = val;
  },
});

const attrs = useAttrs();
</script>

<template>
  <business-selector
    v-model="localModel"
    :multiple="multiple"
    :clearable="clearable"
    :filterable="filterable"
    :collapse-tags="collapseTags"
    :show-all="showAll"
    v-bind="attrs"
  />
</template>
