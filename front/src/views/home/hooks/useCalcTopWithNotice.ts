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

import { computed, Ref } from 'vue';
import { storeToRefs } from 'pinia';
import { useCommonStore } from '@/store';

/**
 * @param top 没有通知栏时，fixed元素距离视口顶部的距离
 */
export const useCalcTopWithNotice = (top: number): [Ref<string>, Ref<boolean>] => {
  const { isNoticeAlert } = storeToRefs(useCommonStore());

  const calcTop = computed(() => (isNoticeAlert.value ? `${top + 40}px` : `${top}px`));

  return [calcTop, isNoticeAlert];
};
