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

import { Reactive, ref, watch } from 'vue';
import { Props } from 'bkui-vue/lib/info-box/info-box';

import { InfoBox } from 'bkui-vue';

export const useSideslider = (formModel: Reactive<any>, config: Partial<Props> = {}) => {
  const defaultConfig: Partial<Props> = {
    title: '确认离开当前页？',
    subTitle: '离开会导致未保存信息丢失',
    headerAlign: 'center',
    footerAlign: 'center',
    confirmText: '离开',
    cancelText: '取消',
  };

  const isChange = ref(false);

  const beforeClose = () => {
    if (isChange.value) {
      return new Promise((resolve, reject) => {
        InfoBox({
          ...defaultConfig,
          ...config,
          onConfirm: () => resolve(true),
          onClose: () => reject(false),
        });
      });
    }
    return true;
  };

  watch(
    formModel,
    () => {
      isChange.value = true;
    },
    { deep: true, once: true },
  );

  return { beforeClose };
};
