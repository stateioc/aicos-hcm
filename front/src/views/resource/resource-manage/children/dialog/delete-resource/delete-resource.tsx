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

import { defineComponent, PropType } from 'vue';

import StepDialog from '@/components/step-dialog/step-dialog';

export default defineComponent({
  components: {
    StepDialog,
  },

  props: {
    title: {
      type: String,
    },
    isShow: {
      type: Boolean,
    },
    isDeleting: {
      type: Boolean,
    },
    data: {
      type: Array,
    },
    columns: {
      type: Array as PropType<any[]>,
    },
  },

  emits: ['update:isShow', 'confirm', 'close'],

  setup(_, { emit }) {
    // 方法
    const handleClose = () => {
      emit('update:isShow', false);
      emit('close');
    };

    const handleConfirm = () => {
      emit('confirm');
    };

    return {
      handleClose,
      handleConfirm,
    };
  },

  render() {
    const steps = [
      {
        component: () => (
          <>
            <bk-table
              class='mb20'
              row-hover='auto'
              columns={this.columns.filter((column) => !column.onlyShowOnList)}
              data={this.data}
              show-overflow-tooltip
            />
            <h3 class='g-resource-tips'>{this.$slots.tips ?? this.$slots?.default?.()}</h3>
          </>
        ),
        isConfirmLoading: this.isDeleting,
      },
    ];

    return (
      <>
        <step-dialog
          title={this.title}
          isShow={this.isShow}
          steps={steps}
          onConfirm={this.handleConfirm}
          onCancel={this.handleClose}></step-dialog>
      </>
    );
  },
});
