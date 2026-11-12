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

<script lang="ts" setup>
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { AUTH_UPDATE_CLB, AUTH_BIZ_UPDATE_CLB } from '@/constants/auth-symbols';
import { getAuthSignByBusinessId } from '@/utils';
import { useExport } from './use-export';

const props = defineProps<{ selections: any[]; isInDropdown?: boolean; bizId?: number }>();
const emit = defineEmits(['click']);

const { t } = useI18n();

const ids = computed(() => props.selections.map((item) => item.id));
const vendorSet = computed(() => new Set(props.selections.map((item) => item.vendor)));
const vendor = computed(() => [...vendorSet.value][0]);

const authSign = computed(() => getAuthSignByBusinessId(props.bizId, AUTH_UPDATE_CLB, AUTH_BIZ_UPDATE_CLB));

const handleExport = () => {
  const { invokeExport } = useExport({
    target: 'lb',
    vendor: vendor.value,
    listeners: ids.value.map((id) => ({ lb_id: id })),
  });
  invokeExport();

  emit('click');
};
</script>

<template>
  <hcm-auth :sign="authSign" v-slot="{ noPerm }" :class="{ 'is-in-dropdown': isInDropdown }">
    <bk-button
      text
      class="button"
      :disabled="!selections.length || vendorSet.size > 1 || noPerm"
      v-bk-tooltips="{ content: '所选负载均衡需属于同一云厂商', disabled: !selections.length || vendorSet.size === 1 }"
      @click="handleExport"
    >
      {{ t('批量导出') }}
    </bk-button>
  </hcm-auth>
</template>

<style lang="less" scoped>
.is-in-dropdown {
  width: 100%;

  .button {
    padding: 0 16px;
    display: inline-block;
    width: 100%;
    text-align: left;
  }
}
</style>
