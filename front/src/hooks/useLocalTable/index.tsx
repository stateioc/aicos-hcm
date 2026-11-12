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

import { Loading, SearchSelect, Table } from 'bkui-vue';
import { ISearchItem } from 'bkui-vue/lib/search-select/utils';
import { Column } from 'bkui-vue/lib/table/props';
import { defineComponent, reactive, ref } from 'vue';
import './index.scss';

export interface IProp {
  data: Array<any>;
  columns: Array<Column>;
  searchData: Array<ISearchItem>;
}

export const useLocalTable = (props: IProp) => {
  const CommonLocalTable = defineComponent({
    setup(_props, { slots }) {
      const pagination = reactive({
        start: 0,
        limit: 10,
        count: 100,
      });
      const searchVal = ref([]);
      const isLoading = ref(false);
      return () => (
        <div class='local-table-container'>
          <section class='operation-wrap'>
            {slots.tab?.()}
            <SearchSelect class='common-search-selector w400' v-model={searchVal.value} data={props.searchData} />
          </section>
          <Loading loading={isLoading.value}>
            <Table data={props.data} columns={props.columns} pagination={pagination} />
          </Loading>
        </div>
      );
    },
  });
  return {
    CommonLocalTable,
  };
};
