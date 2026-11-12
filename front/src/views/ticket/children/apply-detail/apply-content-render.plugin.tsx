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

import { Ref, VNode } from 'vue';

import AccountApplyDetail from './account-apply-detail';
import ApplyDetail from '@/views/service/my-apply/components/apply-detail/index.vue';
import { ACCOUNT_TYPES } from '@/views/ticket/constants';

export const applyContentRender: (...args: any) => VNode = (
  currentApplyData: Ref<any>,
  curApplyKey: Ref<string>,
  applyDetailProps: any,
) => {
  if (ACCOUNT_TYPES.includes(currentApplyData.value.type)) {
    return <AccountApplyDetail detail={currentApplyData.value} />;
  }
  return <ApplyDetail params={currentApplyData.value} key={curApplyKey.value} {...applyDetailProps} />;
};
