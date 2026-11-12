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
import { computed, ref, useAttrs } from 'vue';
import { ModelProperty } from '@/model/typings';
import { SelectColumn } from '@blueking/ediatable';
import { DisplayType } from './typings';

defineOptions({ name: 'hcm-form-enum' });

const model = defineModel<string | string[] | number | number[]>();
const props = withDefaults(
  defineProps<{
    clearable: boolean;
    multiple: boolean;
    option: ModelProperty['option'];
    isNumberValue?: boolean;
    display?: DisplayType;
  }>(),
  {
    clearable: false,
    multiple: false,
    option: () => ({}),
    isNumberValue: false,
  },
);
const attrs = useAttrs();

const comp = computed(() => (props.display?.on === 'cell' ? SelectColumn : 'bk-select'));

const selectList = computed(() =>
  Object.entries(props.option).map(([value, label]) => ({ value: props.isNumberValue ? Number(value) : value, label })),
);

const selectColumnRef = ref();

defineExpose({
  getValue() {
    if (selectColumnRef.value?.getValue) {
      return selectColumnRef.value.getValue().then(() => model.value);
    }
    return model.value;
  },
});
</script>

<template>
  <component
    :is="comp"
    v-model="model"
    ref="selectColumnRef"
    :list="selectList"
    :clearable="clearable"
    :multiple="multiple"
    :multiple-mode="multiple ? 'tag' : 'default'"
    v-bind="attrs"
  />
</template>
