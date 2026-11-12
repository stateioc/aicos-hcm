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
import { useI18n } from 'vue-i18n';

defineOptions({ name: 'device-container-large-data' });

const { t } = useI18n();
</script>

<template>
  <div class="device-container-empty">
    <bk-exception
      class="exception-wrap-item exception-part"
      :title="t('查询结果超出数量限制')"
      :description="t('当前检索条件展示上限为10,000条，请添加检索条件后查询')"
      scene="part"
      type="500"
    />
  </div>
</template>

<style scoped lang="scss"></style>
