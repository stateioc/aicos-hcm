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

<template>
  <bk-select filterable :model-value="modelValue" :loading="isLoading" @scroll-end="getData" @change="handleChange">
    <bk-option v-for="(item, index) in list" :key="index" :value="item.id" :label="item.name" />
  </bk-select>
</template>

<script lang="ts" setup>
import { defineProps, defineEmits, ref, watch } from 'vue';

import { useResourceStore } from '@/store';

const props = defineProps({
  filter: {
    type: Object,
    default: {
      op: 'and',
      rules: [],
    },
  },
  type: {
    type: String,
  },
  modelValue: {
    type: [String, Array],
  },
});

const emits = defineEmits(['update:modelValue']);

const resourceStore = useResourceStore();

const isLoading = ref(false);
const hasLoadEnd = ref(false);
const list = ref([]);
const pageIndex = ref(0);
const limit = 100;

// 获取数据
const getData = () => {
  if (isLoading.value || hasLoadEnd.value) return;

  isLoading.value = true;
  resourceStore
    .list(
      {
        page: {
          count: false,
          start: pageIndex.value * limit,
          limit,
        },
        filter: props.filter,
      },
      props.type,
    )
    .then((listResult: any) => {
      const data = (listResult?.data?.details || listResult?.data || []).map((item: any) => {
        return {
          ...item,
          ...item.spec,
          ...item.attachment,
          ...item.revision,
          ...item.extension,
        };
      });
      pageIndex.value += 1;
      hasLoadEnd.value = data.length < limit;
      list.value.push(...data);
    })
    .finally(() => {
      isLoading.value = false;
    });
};

// 选中
const handleChange = (val: any) => {
  emits('update:modelValue', val);
};

watch(
  [() => props.filter, () => props.type],
  () => {
    list.value = [];
    pageIndex.value = 0;
    hasLoadEnd.value = false;
    getData();
  },
  {
    deep: true,
    immediate: true,
  },
);
</script>
