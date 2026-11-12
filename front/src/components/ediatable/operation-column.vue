<!--
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
-->

<template>
  <FixedColumn>
    <div class="ediatable-operation">
      <div v-if="showCopy" v-bk-tooltips="{ content: copyText }" text class="action-btn" @click="emit('copy')">
        <i class="hcm-icon bkhcm-icon-copy"></i>
      </div>
      <div v-if="showAdd" v-bk-tooltips="{ content: addText }" text class="action-btn" @click="emit('add')">
        <i class="hcm-icon bkhcm-icon-plus-circle-shape"></i>
      </div>
      <div
        v-if="showRemove"
        v-bk-tooltips="{ content: removeText }"
        text
        class="action-btn"
        :class="{ disabled: !removable }"
        @click="handleRemove"
      >
        <i class="hcm-icon bkhcm-icon-minus-circle-shape"></i>
      </div>
    </div>
  </FixedColumn>
</template>

<script setup lang="ts">
import { FixedColumn } from '@blueking/ediatable';

interface IProps {
  removable?: boolean; // true：可用；false：不可用
  showCopy?: boolean;
  showAdd?: boolean;
  showRemove?: boolean;
  copyText?: string;
  addText?: string;
  removeText?: string;
}

const props = withDefaults(defineProps<IProps>(), {
  removable: false,
  showCopy: false,
  showAdd: true,
  showRemove: true,
  copyText: '复制',
  addText: '添加',
  removeText: '删除',
});
const emit = defineEmits(['copy', 'add', 'remove']);

const handleRemove = () => {
  if (!props.removable) return;
  emit('remove');
};
</script>

<style scoped lang="scss">
.ediatable-operation {
  display: flex;
  align-items: center;
  height: 42px;
  padding: 0 16px;

  .action-btn {
    display: flex;
    color: #c4c6cc;
    cursor: pointer;
    font-size: 14px;
    transition: all 0.15s;

    &:hover {
      color: #979ba5;
    }

    &.disabled {
      color: #dcdee5;
      cursor: not-allowed;
    }

    & ~ .action-btn {
      margin-left: 18px;
    }
  }
}
</style>
