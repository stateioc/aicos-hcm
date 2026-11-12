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

import { PropType, defineComponent, ref } from 'vue';
import { PopConfirm, Input } from 'bkui-vue';
import './index.scss';

export default defineComponent({
  name: 'BatchUpdatePopConfirm',
  props: {
    title: {
      type: String as PropType<string>,
      required: true,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    // 值类型: string/number
    valueType: {
      type: String as PropType<'string' | 'number'>,
      default: 'number',
    },
    // 当valueType='number'时, 可以设置min,max
    min: Number,
    max: Number,
    disabledTip: String,
  },
  emits: ['updateValue'],
  setup(props, { emit }) {
    const inputValue = ref('');
    const handleConfirm = () => {
      emit('updateValue', inputValue.value);
      inputValue.value = '';
    };
    return () => (
      <PopConfirm
        width={280}
        trigger='click'
        placement='bottom-start'
        extCls='batch-update-popconfirm'
        onConfirm={handleConfirm}
        disabled={props.disabled}>
        {{
          default: () => (
            <i
              class={`hcm-icon bkhcm-icon-batch-edit${props.disabled ? ' disabled' : ''}`}
              v-bk-tooltips={{
                content: props.disabledTip,
                disabled: !props.disabled,
              }}></i>
          ),
          content: () => (
            <div class='batch-update-popconfirm-content'>
              <div class='title'>批量修改{props.title}</div>
              {props.valueType === 'number' ? (
                <Input
                  v-model_number={inputValue.value}
                  type='number'
                  class='no-number-control'
                  min={props.min}
                  max={props.max}
                  placeholder={`${props.min}-${props.max}`}
                />
              ) : (
                <Input v-model={inputValue.value} />
              )}
            </div>
          ),
        }}
      </PopConfirm>
    );
  },
});
