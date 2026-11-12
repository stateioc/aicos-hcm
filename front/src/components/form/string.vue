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
import { DisplayType } from './typings';
import { ModelProperty } from '@/model/typings';
import { InputColumn } from '@blueking/ediatable';

defineOptions({ name: 'hcm-form-string' });

const props = withDefaults(defineProps<{ option: ModelProperty['option']; display?: DisplayType }>(), {
  option: () => ({}),
});

const model = defineModel<string>();
const attrs = useAttrs();

const comp = computed(() => (props.display?.on === 'cell' ? InputColumn : 'bk-select'));

const inputColumnRef = ref();

defineExpose({
  getValue() {
    if (inputColumnRef.value?.getValue) {
      return inputColumnRef.value.getValue().then(() => model.value);
    }
    return model.value;
  },
});
</script>

<template>
  <component :is="comp" v-model="model" ref="inputColumnRef" v-bind="attrs" />
</template>
