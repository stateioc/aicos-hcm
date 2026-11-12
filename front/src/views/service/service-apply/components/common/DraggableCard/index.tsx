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
import './index.scss';
import { AngleDown, AngleUp } from 'bkui-vue/lib/icon';

export default defineComponent({
  props: {
    title: {
      required: true,
      type: String,
    },
    index: {
      required: true,
      type: Number,
    },
    isAllExpand: {
      required: true,
      type: Boolean,
    },
  },
  setup(props, { slots }) {
    const isExpand = ref(props.isAllExpand);
    watch(
      () => props.isAllExpand,
      (val) => (isExpand.value = val),
    );
    return () => (
      <div class={'draggable-container mb12'}>
        <div class='draggable-card-header'>
          <div onClick={() => (isExpand.value = !isExpand.value)} class={'draggable-card-header-icon'}>
            {isExpand.value ? <AngleUp width={17} height={14} /> : <AngleDown width={17} height={14} />}
          </div>
          <span>
            <span class={'draggable-card-header-title'}>{props.title}</span>
            {slots.tag?.()}
          </span>
          <div class={'draggable-card-header-index'}>{props.index}</div>
          <i class={'hcm-icon bkhcm-icon-grag-fill mr16 draggable-card-header-draggable-btn'}></i>
        </div>
        {isExpand.value ? <div class={'draggable-card-container'}>{slots.default?.()}</div> : null}
      </div>
    );
  },
});
