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

import { ref, watchEffect, Ref } from 'vue';
import { useAccountStore } from '@/store/account';
import { useBusinessGlobalStore, type IBusinessItem } from '@/store/business-global';

export const useAccountBusiness = (accountId: Ref<string>) => {
  const accountStore = useAccountStore();
  const businessGlobalStore = useBusinessGlobalStore();

  const accountBizList = ref<IBusinessItem[]>([]);

  const isAccountDetailLoading = ref(false);

  watchEffect(async () => {
    isAccountDetailLoading.value = true;
    if (accountId.value) {
      // 账号业务列表等于-1时，管理业务使用全部业务，否则限定为账号业务列表
      const accountUsageBizRes = await accountStore.getAccountUsageBiz(accountId.value);
      const accountBizIds = accountUsageBizRes?.data;
      if (accountBizIds?.[0] !== -1) {
        accountBizList.value = businessGlobalStore.businessFullList.filter((item) => accountBizIds.includes(item.id));
      } else {
        // null表示使用全部业务
        accountBizList.value = null;
      }
    }
    isAccountDetailLoading.value = false;
  });

  return {
    accountBizList,
    isAccountDetailLoading,
  };
};
