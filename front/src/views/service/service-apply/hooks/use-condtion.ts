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

import { VendorEnum } from '@/common/constant';
import { Senarios, useWhereAmI } from '@/hooks/useWhereAmI';
import { computed, reactive } from 'vue';

export type Cond = {
  bizId: number;
  cloudAccountId: string;
  vendor: Lowercase<keyof typeof VendorEnum> | string;
  region: string;
  resourceGroup?: string;
};

export default () => {
  const { getBizsId, whereAmI } = useWhereAmI();

  const cond = reactive<Cond>({
    bizId: whereAmI.value === Senarios.business ? getBizsId() : 0,
    cloudAccountId: '',
    vendor: '',
    region: '',
    resourceGroup: '',
  });

  const isEmptyCond = computed(() => {
    const isResourcePage = whereAmI.value === Senarios.resource;
    const isEmpty = !cond.cloudAccountId || !cond.vendor || !cond.region || (!isResourcePage && !cond.bizId);
    if (cond.vendor === VendorEnum.AZURE) {
      return isEmpty || !cond.resourceGroup;
    }
    return isEmpty;
  });

  return {
    cond,
    isEmptyCond,
  };
};
