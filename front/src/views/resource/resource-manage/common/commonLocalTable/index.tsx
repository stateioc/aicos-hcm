/*
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
 */

import { SearchSelect, Loading, Table } from 'bkui-vue';
import { ISearchItem } from 'bkui-vue/lib/search-select/utils';
import { PropType, defineComponent, reactive, ref, watch } from 'vue';
import './index.scss';
import { Column } from 'bkui-vue/lib/table/props';

export default defineComponent({
  props: {
    searchData: {
      required: true,
      type: Array as PropType<Array<ISearchItem>>,
    },
    columns: {
      required: true,
      type: Array as PropType<Array<Column>>,
    },
    data: {
      required: true,
      type: Array as PropType<Array<Record<string, any>>>,
    },
    changeData: {
      required: true,
      type: Function as PropType<(data: Array<Record<string, any>>) => void>,
    },
  },
  setup(props, { slots }) {
    const pagination = reactive({
      start: 0,
      limit: 10,
      count: 100,
    });
    const searchVal = ref([]);
    const isLoading = ref(false);
    const localData = ref(props.data);

    watch(
      () => searchVal.value,
      () => {
        if (!Object.keys(searchVal.value).length) localData.value = props.data;
        for (const { id, values } of searchVal.value) {
          const searchReg = new RegExp(values?.[0]?.id);
          localData.value = localData.value.filter((item) => searchReg.test(item[id]));
        }
      },
      {
        immediate: true,
        deep: true,
      },
    );

    watch(
      () => props.data,
      () => (localData.value = props.data),
      {
        immediate: true,
        deep: true,
      },
    );

    return () => (
      <>
        <div class={'felx-row'}>
          {slots.default?.()}
          <SearchSelect class='w500 common-search-selector' v-model={searchVal.value} data={props.searchData} />
        </div>
        <Loading loading={isLoading.value}>
          <Table data={localData.value} columns={props.columns} pagination={pagination} showOverflowTooltip />
        </Loading>
      </>
    );
  },
});
