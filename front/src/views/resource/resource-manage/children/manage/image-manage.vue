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
import type { FilterType } from '@/typings/resource';

import { PropType, watch, computed } from 'vue';
import useQueryList from '../../hooks/use-query-list';
import useColumns from '../../hooks/use-columns';
import useFilter from '@/views/resource/resource-manage/hooks/use-filter';

const props = defineProps({
  filter: {
    type: Object as PropType<FilterType>,
  },
  whereAmI: {
    type: String,
  },
});

const { columns, settings } = useColumns('image');

const { searchData, searchValue, filter } = useFilter(props);

const { datas, pagination, isLoading, handlePageChange, handlePageSizeChange, handleSort } = useQueryList(
  {
    filter: filter.value,
  },
  'images',
);

const selectSearchData = computed(() => {
  return [
    {
      name: '镜像ID',
      id: 'cloud_id',
    },
    ...searchData.value,
    // ...[{
    //   name: '公网ipv4',
    //   id: 'public_ipv4',
    // }, {
    //   name: '内网ipv4',
    //   id: 'private_ipv4',
    // }],
  ];
});

// 字段列表
const fieldList: string[] = columns.map((item) => item.field);
let dataList: any = datas;
// 接口缺失字段填充默认值
watch(datas, (list) => {
  dataList = list.map((item) => {
    fieldList.forEach((field) => {
      if (!Object.hasOwnProperty.call(item, field)) {
        item[field] = '--';
      }
    });
    return item;
  });
});
</script>

<template>
  <bk-loading :loading="isLoading">
    <bk-search-select
      class="search"
      clearable
      :conditions="[]"
      :data="selectSearchData"
      v-model="searchValue"
      value-behavior="need-key"
    />
    <bk-table
      :settings="settings"
      row-hover="auto"
      remote-pagination
      :pagination="pagination"
      :columns="columns"
      :data="dataList"
      show-overflow-tooltip
      @page-limit-change="handlePageSizeChange"
      @page-value-change="handlePageChange"
      @column-sort="handleSort"
    />
  </bk-loading>
</template>

<style lang="scss" scoped>
.search {
  width: 500px;
  margin-left: auto;
}
</style>
