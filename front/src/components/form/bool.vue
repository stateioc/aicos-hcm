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
import { DisplayType } from './typings';
import { SelectColumn } from '@blueking/ediatable';

defineOptions({ name: 'hcm-form-bool' });

const props = withDefaults(defineProps<{ option: ModelProperty['option']; display: DisplayType }>(), {
  option: () => ({}),
  display: () => ({
    on: 'default',
  }),
});

const model = defineModel<boolean | string>();
const attrs = useAttrs();

const trueText = computed(() => props.option.trueText as string);
const falseText = computed(() => props.option.falseText as string);
const dipslayOn = computed(() => props.display.on);
const appearance = computed(() => props.display.appearance);

// select组件目前不支持false或0的value，这里使用字符串值替代
const selectList = computed(() => [
  { value: 'true', label: trueText.value },
  { value: 'false', label: falseText.value },
]);

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
  <template v-if="dipslayOn === 'cell' && appearance === 'select'">
    <select-column :list="selectList" v-model="model" ref="selectColumnRef" v-bind="attrs" />
  </template>
  <template v-else-if="appearance === 'select'">
    <bk-select v-model="model" :list="selectList" v-bind="attrs" />
  </template>
  <template v-else>
    <bk-switcher v-model="model" :on-text="trueText" :off-text="falseText" v-bind="attrs" />
  </template>
</template>
