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
import { useRoute } from 'vue-router';
import useColumns from '../../../hooks/use-columns';
import useQueryList from '../../../hooks/use-query-list';

const route = useRoute();
const { columns, settings } = useColumns('subnet');

const { datas, pagination, isLoading, handlePageChange, handlePageSizeChange } = useQueryList(
  {
    filter: {
      op: 'and',
      rules: [
        {
          field: 'vpc_id',
          op: 'eq',
          value: route.query.id,
        },
      ],
    },
  },
  'subnets',
);
</script>

<template>
  <bk-loading :loading="isLoading">
    <bk-table
      :settings="settings"
      row-hover="auto"
      remote-pagination
      :pagination="pagination"
      :columns="columns.filter((column: any) => !column.onlyShowOnList)"
      :data="datas"
      show-overflow-tooltip
      @page-limit-change="handlePageSizeChange"
      @page-value-change="handlePageChange"
    />
  </bk-loading>
</template>
