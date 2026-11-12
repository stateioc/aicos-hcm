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

<script setup lang="ts">
import { useSlots } from 'vue';
import CopyToClipboard, { type ICopyToClipboardProps } from './index.vue';

const props = defineProps<ICopyToClipboardProps>();

const slots = useSlots();
</script>

<template>
  <div class="hover-copy">
    <slot v-if="slots?.default"></slot>
    <span v-else>{{ content || '--' }}</span>
    <copy-to-clipboard v-if="content" class="copy-icon" v-bind="props" />
  </div>
</template>

<style scoped lang="scss">
.hover-copy {
  display: inline-flex;
  align-items: center;
  gap: 4px;

  .copy-icon {
    opacity: 0;
  }

  &:hover {
    .copy-icon {
      opacity: 1;
    }
  }
}
</style>
