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

import { Ref, ref, watch } from 'vue';
import { storeToRefs } from 'pinia';
import { useAccountSelectorStore } from '@/store/account-selector';
import type { IAccountSelectorProps } from './index-new.vue';
import { QueryRuleOPEnum, IAccountItem } from '@/typings';
import { vendorProperty } from './vendor.plugin';

const useList = (props: IAccountSelectorProps) => {
  const accountSelectorStore = useAccountSelectorStore();
  const list = ref<IAccountItem[]>([]);
  let loading: Ref<boolean>;
  const { businessAccountList, resourceAccountList, businessAccountLoading, resourceAccountLoading } =
    storeToRefs(accountSelectorStore);
  const { getBusinessAccountList, getResourceAccountList } = accountSelectorStore;

  const getList = async (bizId: number) => {
    if (bizId) {
      loading = businessAccountLoading;
      await getBusinessAccountList({
        bizId,
        account_type: 'resource',
      });
      list.value = businessAccountList.value;
    } else {
      loading = resourceAccountLoading;
      await getResourceAccountList({
        filter: {
          op: 'and',
          rules: [
            {
              field: 'type',
              op: QueryRuleOPEnum.EQ,
              value: 'resource',
            },
          ],
        },
      });
      list.value = resourceAccountList.value;
    }
  };

  watch(
    () => props.bizId,
    (bizId, oldBizId) => {
      if (Number(bizId) !== Number(oldBizId)) {
        list.value = [];
        getList(bizId);
      }
    },
    { immediate: true },
  );

  return {
    list,
    loading,
  };
};

const dataCommon = {
  useList,
  vendorProperty,
};

export type FactoryType = typeof dataCommon;

export default dataCommon;
