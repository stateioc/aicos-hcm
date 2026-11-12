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
const props = defineProps<{ step: number; title: string }>();
</script>

<template>
  <div class="step-container">
    <div class="title">
      <span class="step-num">Step {{ props.step }}</span>
      <span>{{ props.title }}</span>
    </div>
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<style scoped lang="scss">
.step-container {
  .title {
    margin-bottom: 12px;
    font-size: 14px;
    color: #313238;

    .step-num {
      margin-right: 12px;
      color: #ea3636;
    }
  }

  .content {
    margin-bottom: 30px;
  }

  & + .step-container {
    margin-top: 32px;
  }
}
</style>
