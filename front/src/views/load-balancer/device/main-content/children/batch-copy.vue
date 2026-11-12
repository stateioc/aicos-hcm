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
  <hcm-dropdown ref="dropdown" :disabled="!selections.length" class="dropdown-container">
    {{ t('复制') }}
    <angle-down class="dropdown-icon" />
    <template #menus>
      <copy-to-clipboard
        type="dropdown-item"
        :text="t('监听器端口')"
        :content="selectedLoadBalancerPorts"
        @success="handleSuccess"
      />
      <copy-to-clipboard
        type="dropdown-item"
        :text="t('监听器协议')"
        :content="selectedLoadBalancerProtocols"
        @success="handleSuccess"
      />
      <copy-to-clipboard
        type="dropdown-item"
        :text="t('负载均衡VIP')"
        :content="selectedLoadBalancerVips"
        @success="handleSuccess"
      />
      <copy-to-clipboard
        type="dropdown-item"
        :text="t('负载均衡ID')"
        :content="selectedLoadBalancerIDs"
        @success="handleSuccess"
      />
    </template>
  </hcm-dropdown>
</template>

<script setup lang="ts">
import { computed, useTemplateRef } from 'vue';
import { useI18n } from 'vue-i18n';

import { AngleDown } from 'bkui-vue/lib/icon';
import HcmDropdown from '@/components/hcm-dropdown/index.vue';
import CopyToClipboard from '@/components/copy-to-clipboard/index.vue';

const props = defineProps<{ selections: any[] }>();
const { t } = useI18n();
const dropdownRef = useTemplateRef<typeof HcmDropdown>('dropdown');

const selectedLoadBalancerIDs = computed(() => props.selections?.map((item) => item.lb_cloud_id)?.join('\n'));
const selectedLoadBalancerPorts = computed(() => props.selections?.map((item) => item.port)?.join('\n'));
const selectedLoadBalancerProtocols = computed(() => props.selections?.map((item) => item.protocol)?.join('\n'));
const selectedLoadBalancerVips = computed(() => props.selections?.map((item) => item.lb_vip)?.join('\n'));

const handleSuccess = () => {
  dropdownRef.value?.hidePopover();
};
</script>

<style scoped lang="scss">
.dropdown-container {
  .dropdown-icon {
    font-size: 26px;
  }
}
</style>
