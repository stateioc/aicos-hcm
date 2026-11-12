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
import { computed } from 'vue';
import { ModelProperty } from '@/model/typings';
import { DisplayType } from '../typings';
import StatusSuccess from '@/assets/image/success-account.png';
import StatusLoading from '@/assets/image/status_loading.png';

const props = defineProps<{
  value: string;
  displayValue: string | number | string[] | number[];
  option: ModelProperty['option'];
  displayOn: DisplayType['on'];
}>();

const icon = computed(() => {
  const status = props.value;
  if (status === '0') return StatusLoading;
  return StatusSuccess;
});
</script>

<template>
  <div class="clb-status">
    <img :src="icon" class="icon" :class="{ 'spin-icon': value === '0' }" alt="icon" />
    <bk-overflow-title resizeable type="tips">
      <span class="text">{{ displayValue }}</span>
    </bk-overflow-title>
  </div>
</template>

<style lang="scss" scoped>
.clb-status {
  display: flex;
  align-items: center;

  .icon {
    width: 14px;
    height: 14px;
    margin-right: 4px;
  }
}
</style>
