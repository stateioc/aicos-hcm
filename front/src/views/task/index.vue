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
import { useRouter, useRoute } from 'vue-router';
import { useWhereAmI } from '@/hooks/useWhereAmI';
import clb from './clb.vue';

const router = useRouter();
const route = useRoute();
const { getBizsId } = useWhereAmI();

const tabPanels = [{ name: 'clb', label: '负载均衡' }];
const tabActive = computed({
  get() {
    return route.params.resourceType || tabPanels[0].name;
  },
  set(value) {
    router.push({ params: { resourceType: value }, query: { bizs: getBizsId() } });
  },
});

const tabComps: Record<string, any> = { clb };
</script>

<template>
  <bk-tab class="page-task" type="unborder-card" v-model:active="tabActive">
    <bk-tab-panel
      v-for="panel in tabPanels"
      :key="panel.name"
      :name="panel.name"
      :label="panel.label"
      render-directive="'if'"
    >
      <component :is="tabComps[tabActive]" v-if="tabActive === panel.name" />
    </bk-tab-panel>
  </bk-tab>
</template>

<style lang="scss" scoped>
.page-task {
  height: 100%;

  :deep(.bk-tab-header) {
    padding: 0 12px;
  }

  :deep(.bk-tab-content) {
    padding: 16px;
  }
}
</style>
