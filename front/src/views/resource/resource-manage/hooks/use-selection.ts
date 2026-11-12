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

/**
 * 选择相关状态和事件
 */
import { Senarios, useWhereAmI } from '@/hooks/useWhereAmI';
import { useAccountStore } from '@/store';
import { useResourceAccountStore } from '@/store/useResourceAccountStore';
import { ref, watch } from 'vue';
import isEqual from 'lodash/isEqual';

type SelectionType = {
  checked: boolean;
  data: any[];
  isAll: boolean;
  row: any;
};

export default () => {
  const selections = ref([]);
  const { whereAmI } = useWhereAmI();
  const resourceAccountStore = useResourceAccountStore();
  const accountStore = useAccountStore();

  watch(
    () => resourceAccountStore.resourceAccount,
    () => {
      if (whereAmI.value !== Senarios.resource) return;
      resetSelections();
    },
    {
      deep: true,
    },
  );

  watch(
    () => accountStore.bizs,
    () => {
      if (whereAmI.value !== Senarios.business) return;
      resetSelections();
    },
  );

  const handleSelectionChange = (selection: SelectionType, isCurRowSelectEnable: (row: any) => void, isAll = false) => {
    // 全选
    if (isAll && selection.checked) {
      selections.value = JSON.parse(JSON.stringify(selection.data));
      selections.value = selections.value.filter((row) => isCurRowSelectEnable(row));
    }
    // 取消全选
    if (isAll && !selection.checked) {
      selections.value = [];
    }
    // 选择某一个
    if (!isAll && selection.checked) {
      selections.value.push(selection.row);
    }
    // 取消选择某一个
    if (!isAll && !selection.checked) {
      // 没有rowKey的情况下，统一通过JSON转换后的对象比较，意图是确保比较结果符合预期
      const index = selections.value.findIndex((item) =>
        isEqual(JSON.parse(JSON.stringify(item)), JSON.parse(JSON.stringify(selection.row))),
      );
      if (index !== -1) {
        selections.value.splice(index, 1);
      }
    }
  };

  const resetSelections = () => {
    selections.value = [];
  };

  return {
    selections,
    handleSelectionChange,
    resetSelections,
  };
};
