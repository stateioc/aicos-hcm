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

import { defineComponent, ref, watch } from 'vue';
import { SelectColumn } from '@blueking/ediatable';

export default defineComponent({
  props: {
    modelValue: String,
  },
  setup(props, { emit }) {
    const selectedVal = ref(props.modelValue || AdjustTypeEnum.Increase);

    watch(
      () => selectedVal.value,
      (val) => {
        emit('update:modelValue', val);
      },
    );

    watch(
      () => props.modelValue,
      () => {
        selectedVal.value = props.modelValue;
      },
    );

    return () => <SelectColumn list={AdjustTypeList} v-model={selectedVal.value}></SelectColumn>;
  },
});

export enum AdjustTypeEnum {
  Increase = 'increase',
  Decrease = 'decrease',
}

export const AdjustTypeList = [
  {
    label: '增加',
    value: AdjustTypeEnum.Increase,
  },
  {
    label: '减少',
    value: AdjustTypeEnum.Decrease,
  },
];
