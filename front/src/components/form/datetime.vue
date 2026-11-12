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
import { getDateShortcutRange } from '@/utils/search';
import type { DatePickerValueType } from 'bkui-vue/lib/date-picker/interface';

defineOptions({ name: 'hcm-form-datetime' });

const props = withDefaults(
  defineProps<{ format: string; type: 'date' | 'daterange' | 'datetime' | 'datetimerange' | 'month' | 'year' }>(),
  {
    format: 'yyyy-MM-dd HH:mm:ss',
  },
);

const rangeType = computed(() => ['daterange', 'datetimerange'].includes(props.type));
const shortcutsRange = computed(() => (rangeType.value ? getDateShortcutRange() : []));

const model = defineModel<DatePickerValueType>();

const localModel = computed({
  get: () => {
    if (!model.value) {
      return rangeType.value ? [] : ('' as unknown);
    }
    if (Array.isArray(model.value) && !model.value.filter((item) => Boolean(item)).length) {
      return [] as unknown;
    }
    // 当传入的值是dateString时，统一认为是ISO 8601的格式，透传给datepicker组件时未能正确展示为本地时间，转换为date时则正常
    if (typeof model.value === 'string') {
      return new Date(model.value) as DatePickerValueType;
    }
    if (Array.isArray(model.value)) {
      return model.value.map((item) => {
        if (typeof item === 'string') {
          return new Date(item);
        }
        return item;
      }) as DatePickerValueType;
    }
    return model.value;
  },
  set: (val: DatePickerValueType) => {
    model.value = val;
  },
});
</script>

<template>
  <bk-date-picker v-model="localModel" :type="type" :shortcuts="shortcutsRange" :format="format" />
</template>
