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
  <!-- loading -->
  <bk-loading v-if="loading" theme="primary" loading mode="spin" size="mini"></bk-loading>
  <div v-else class="refresh-cell">
    <!-- error -->
    <template v-if="showError">
      <i class="hcm-icon bkhcm-icon-alert error-icon" v-bk-tooltips="{ content: error, disabled: !showError }"></i>
      <bk-button class="text" theme="primary" text @click="emit('click')">{{ refreshText }}</bk-button>
    </template>
    <!-- 正常展示 -->
    <slot v-else></slot>
  </div>
</template>

<script setup lang="ts">
interface IProps {
  loading?: boolean;
  showError?: boolean;
  error?: string;
  refreshText?: string;
}

withDefaults(defineProps<IProps>(), {
  refreshText: '刷新',
});
const emit = defineEmits(['click']);
</script>

<style scoped lang="scss">
.refresh-cell {
  display: flex;
  align-items: center;

  .error-icon {
    color: $danger-color;
    font-size: 14px;
    cursor: pointer;
  }

  .text {
    margin-left: 4px;
    display: none;
  }

  &:hover {
    .text {
      display: block;
    }
  }
}
</style>
