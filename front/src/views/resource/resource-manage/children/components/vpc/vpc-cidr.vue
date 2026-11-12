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

<script lang="ts" setup>
import { watch, ref } from 'vue';

const props = defineProps({
  detail: {
    type: Object,
  },
});

const columns = ref([]);

watch(
  () => props.detail,
  () => {
    switch (props.detail.vendor) {
      case 'tcloud':
        columns.value = [
          {
            label: '地址类型',
            field: 'type',
          },
          {
            label: 'CIDR',
            field: 'cidr',
          },
          {
            label: '类别',
            field: 'category',
          },
        ];
        break;
      case 'aws':
        columns.value = [
          {
            label: '地址类型',
            field: 'type',
          },
          {
            label: 'CIDR',
            field: 'cidr',
          },
          {
            label: '地址池',
            field: 'address_pool',
          },
          {
            label: '状态',
            field: 'state',
          },
        ];
        break;
      case 'azure':
      case 'huawei':
        columns.value = [
          {
            label: '地址类型',
            field: 'type',
          },
          {
            label: 'CIDR',
            field: 'cidr',
          },
        ];
        break;
    }
  },
  {
    deep: true,
    immediate: true,
  },
);
</script>

<template>
  <bk-table row-hover="auto" :columns="columns" :data="props.detail.cidr" show-overflow-tooltip />
</template>
