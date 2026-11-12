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

import { computed, defineComponent } from 'vue';
import { Input, Button } from 'bkui-vue';
import { Plus } from 'bkui-vue/lib/icon';
import './index.scss';

export default defineComponent({
  name: 'InputNumber',
  props: {
    modelValue: Number,
    min: Number,
    max: {
      type: Number,
      default: Infinity,
    },
  },
  emits: ['update:modelValue'],
  setup(props, ctx) {
    const handleDecrement = () => {
      if (props.modelValue === props.min) return;
      ctx.emit('update:modelValue', props.modelValue - 1);
    };
    const handleIncrement = () => {
      if (props.modelValue === props.max) return;
      ctx.emit('update:modelValue', props.modelValue + 1);
    };
    const handleChange = (val: number) => {
      if (val < props.min || val > props.max) return;
      ctx.emit('update:modelValue', +val);
    };
    const isMin = computed(() => props.modelValue === props.min);
    const isMax = computed(() => props.modelValue === props.max);
    return () => (
      <Input class='input-number' modelValue={props.modelValue} min={props.min} onChange={handleChange}>
        {{
          prefix: () => (
            <Button text onClick={handleDecrement} disabled={isMin.value}>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 1024 1024'
                style='vertical-align: middle; fill: currentcolor; overflow: hidden; width: 24px; height: 24px;'>
                <path d='M288 480H736V544H288z'></path>
              </svg>
            </Button>
          ),
          suffix: () => (
            <Button text onClick={handleIncrement} disabled={isMax.value}>
              <Plus width={24} height={24} />
            </Button>
          ),
        }}
      </Input>
    );
  },
});
