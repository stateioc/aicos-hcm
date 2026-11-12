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
import { VendorEnum } from '@/common/constant';

const props = defineProps<{ selections: any[]; vendor: VendorEnum; bizId?: number }>();
const { t } = useI18n();

const targetIds = computed(() =>
  props.selections.reduce((prev, cur) => {
    prev.push(...cur.targets.map((item) => item.id));
    return prev;
  }, []),
);

const authSign = computed(() => getAuthSignByBusinessId(props.bizId, AUTH_UPDATE_CLB, AUTH_BIZ_UPDATE_CLB));

const handleExport = () => {
  const { invokeExport } = useExport({
    target: 'rs',
    vendor: props.vendor,
    listeners: [],
    targetIds: targetIds.value,
    check: false,
  });
  invokeExport();
};
</script>

<template>
  <hcm-auth :sign="authSign" v-slot="{ noPerm }">
    <bk-button :disabled="!selections.length || noPerm" @click="handleExport">
      {{ t('批量导出') }}
    </bk-button>
  </hcm-auth>
</template>
