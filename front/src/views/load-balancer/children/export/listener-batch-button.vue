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
import { computed, ComputedRef, inject } from 'vue';
import { useI18n } from 'vue-i18n';
import { IAuthSign } from '@/common/auth-service';
import { useExport } from './use-export';

const props = defineProps<{ selections: any[]; onlyExportListener?: boolean; bizId?: number }>();
const { t } = useI18n();

const vendor = computed(() => props.selections[0].vendor);
const listeners = computed(() =>
  props.selections.reduce((acc, cur) => {
    const found = acc.find((item: any) => item.lb_id === cur.lb_id);
    if (found) {
      found.lbl_ids.push(cur.id);
    } else {
      acc.push({
        lb_id: cur.lb_id,
        lbl_ids: [cur.id],
      });
    }
    return acc;
  }, []),
);

const clbOperationAuthSign = inject<ComputedRef<IAuthSign | IAuthSign[]>>('clbOperationAuthSign');

const handleExport = () => {
  const { invokeExport } = useExport({
    target: 'listener',
    vendor: vendor.value,
    listeners: listeners.value,
    onlyExportListener: props.onlyExportListener,
  });
  invokeExport();
};
</script>

<template>
  <hcm-auth :sign="clbOperationAuthSign" v-slot="{ noPerm }">
    <bk-button :disabled="!selections.length || noPerm" @click="handleExport">
      {{ t('批量导出') }}
    </bk-button>
  </hcm-auth>
</template>
