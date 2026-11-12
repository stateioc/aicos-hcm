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
import { computed, ref } from 'vue';
import { ModelProperty } from '@/model/typings';
import { DisplayType } from './typings';
import { InputColumn } from '@blueking/ediatable';

defineOptions({ name: 'hcm-form-array' });

const props = withDefaults(
  defineProps<{ multiple: boolean; option: ModelProperty['option']; display?: DisplayType }>(),
  {
    multiple: false,
    option: () => ({}),
  },
);

const model = defineModel<string | string[]>();

const displayOn = computed(() => props.display?.on || 'cell');
const appearance = computed(() => props.display?.appearance);

const localModel = computed({
  get() {
    if (props.multiple && !Array.isArray(model.value)) {
      return [model.value];
    }
    return model.value;
  },
  set(val) {
    model.value = val;
  },
});

const defaultComp = computed(() => (props.display?.on === 'cell' ? InputColumn : 'bk-input'));

const appearanceComps: Record<string, any> = {};

const compColumnRef = ref();

defineExpose({
  getValue() {
    if (compColumnRef.value?.getValue) {
      return compColumnRef.value.getValue().then(() => model.value);
    }
    return model.value;
  },
});
</script>

<template>
  <component
    v-if="appearance"
    ref="compColumnRef"
    v-model="localModel"
    :is="appearanceComps[appearance]"
    :display-on="displayOn"
    :option="option"
  />
  <template v-else>
    <component :is="defaultComp" v-model="localModel" ref="compColumnRef" />
  </template>
</template>
