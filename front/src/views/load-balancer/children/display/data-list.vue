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
import { ref } from 'vue';
import { PaginationType, SortType } from '@/typings';
import { ModelPropertyColumn } from '@/model/typings';
import usePage from '@/hooks/use-page';
import useTableSettings from '@/hooks/use-table-settings';

export interface IDataListProps {
  columns: ModelPropertyColumn[];
  list: any[];
  enableQuery?: boolean;
  pagination?: PaginationType;
  remotePagination?: boolean;
  hasSelection?: boolean;
  showSetting?: boolean;
}

const props = withDefaults(defineProps<IDataListProps>(), {
  enableQuery: true,
  remotePagination: true,
  showSetting: true,
});

const emit = defineEmits<{
  'column-sort': [sortType: SortType];
  'scroll-bottom': [];
}>();

const tableRef = ref(null);

const { handlePageChange, handlePageSizeChange, handleSort } = usePage(props.enableQuery, props.pagination);

const { settings } = useTableSettings(props.columns);

const getDisplayCompProps = (column: ModelPropertyColumn, row: any) => {
  const { id } = column;
  if (id === 'region') {
    return { vendor: row.vendor };
  }
  return {};
};

const handleColumnSort = (sortType: SortType) => {
  if (props.remotePagination) {
    handleSort(sortType);
    return;
  }
  emit('column-sort', sortType);
};

const handleScrollBottom = () => {
  emit('scroll-bottom');
};

const clearSelection = () => {
  tableRef.value?.clearSelection();
};
const getSelection = () => {
  return tableRef.value?.getSelection();
};

defineExpose({ clearSelection, getSelection });
</script>

<template>
  <bk-table
    ref="tableRef"
    row-key="id"
    row-hover="auto"
    :data="list"
    :pagination="pagination"
    :settings="showSetting ? settings : undefined"
    :remote-pagination="remotePagination"
    show-overflow-tooltip
    @page-limit-change="handlePageSizeChange"
    @page-value-change="handlePageChange"
    @column-sort="handleColumnSort"
    @scroll-bottom="handleScrollBottom"
  >
    >
    <bk-table-column
      v-if="hasSelection"
      :width="40"
      :min-width="40"
      type="selection"
      :fixed="columns[0]?.fixed ?? undefined"
    />
    <bk-table-column
      v-for="(column, index) in columns"
      :key="index"
      :prop="column.id"
      :label="column.name"
      :sort="column.sort"
      :width="column.width"
      :fixed="column.fixed"
      :render="column.render"
      :filter="column.filter"
    >
      <template #default="{ row }">
        <display-value
          :property="column"
          :value="row[column.id]"
          :display="column?.meta?.display"
          v-bind="getDisplayCompProps(column, row)"
        />
      </template>
    </bk-table-column>
    <slot name="action"></slot>
    <!-- TODO-CLB: 空状态 -->
  </bk-table>
</template>
