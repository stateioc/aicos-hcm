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

import { defineComponent, ref } from 'vue';
import { Search } from 'bkui-vue/lib/icon';

import './index.scss';

export default defineComponent({
  name: 'SearchInput',
  props: {
    width: {
      type: Number,
      default: 300,
    },
    placeholder: {
      type: String,
      default: '请输入',
    },
    modelValue: {
      type: String,
      default: '',
    },
  },
  emits: ['search', 'update:modelValue'],
  setup(props, ctx) {
    const inputVal = ref(props.modelValue);

    const handleInput = (val: string) => {
      if (val === '') {
        triggerSearch();
      }
    };

    const triggerSearch = () => {
      ctx.emit('update:modelValue', inputVal.value);
      ctx.emit('search');
    };

    return () => (
      <bk-input
        v-model={inputVal.value}
        style={{ width: `${props.width}px` }}
        clearable={true}
        placeholder={props.placeholder}
        onClear={triggerSearch}
        onEnter={triggerSearch}
        onInput={handleInput}>
        {{
          suffix: () => <Search class='search-input-icon' />,
        }}
      </bk-input>
    );
  },
});
