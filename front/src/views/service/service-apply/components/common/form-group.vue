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
defineProps<{
  title: string;
}>();
</script>
<template>
  <div class="form-group">
    <div class="group-title" v-if="title">{{ title }}</div>
    <div class="group-content">
      <slot></slot>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.form-group {
  .group-title {
    font-size: 14px;
    font-weight: normal;
    padding: 8px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.15);
  }

  .group-content {
    padding: 12px 36px 0 0;
    width: 60%;
  }

  & + .form-group {
    margin-top: 4px;
  }
}

@media screen and (max-width: 1660px) {
  .form-group {
    .group-content {
      width: 100%;
    }
  }
}
</style>
