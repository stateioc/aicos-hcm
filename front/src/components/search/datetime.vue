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
import DateTime from '@/components/form/datetime.vue';
import type { DatePickerValueType } from 'bkui-vue/lib/date-picker/interface';

defineOptions({ name: 'hcm-search-datetime' });

withDefaults(
  defineProps<{
    format: string;
    type: 'date' | 'daterange' | 'datetime' | 'datetimerange' | 'month' | 'year';
    appendToBody: boolean;
  }>(),
  {
    format: 'yyyy-MM-dd HH:mm:ss',
    type: 'datetimerange',
    appendToBody: true,
  },
);

const model = defineModel<DatePickerValueType>();
</script>

<template>
  <DateTime v-model="model" :type="type" :format="format" :append-to-body="appendToBody" />
</template>
