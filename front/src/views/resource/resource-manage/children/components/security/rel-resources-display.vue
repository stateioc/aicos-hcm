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
import { ISecurityGroupOperateItem } from '@/store/security-group';
import { TagThemeEnum } from 'bkui-vue/lib/shared';

defineProps<{ resources: ISecurityGroupOperateItem['resources']; tagTheme?: TagThemeEnum }>();
</script>

<template>
  <div class="rel-res-wrap">
    <div class="rel-res-item" v-for="resource in resources" :key="resource.res_name">
      {{ resource.res_name }}
      <bk-tag :theme="tagTheme" size="small" class="ml2">
        <span class="number">{{ resource.count }}</span>
      </bk-tag>
    </div>
  </div>
</template>

<style scoped lang="scss">
.rel-res-wrap {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  row-gap: 4px;

  .rel-res-item {
    display: flex;
    align-items: center;

    .number {
      padding: 0 4px;
      font-size: 12px;
    }

    &:not(:last-of-type)::after {
      content: '|';
      margin: 0 4px;
    }
  }
}
</style>
