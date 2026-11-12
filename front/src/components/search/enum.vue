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
import { ModelProperty } from '@/model/typings';
import { ref, watchEffect } from 'vue';
defineOptions({ name: 'hcm-search-enum' });

const model = defineModel<string | string[]>();

const props = withDefaults(defineProps<{ multiple: boolean; option: ModelProperty['option'] }>(), {
  multiple: true,
  option: () => ({}),
});

const localOption = ref<ModelProperty['option']>({});

watchEffect(async () => {
  if (typeof props.option === 'function') {
    localOption.value = await props.option();
  } else {
    localOption.value = props.option;
  }
});
</script>

<template>
  <bk-select v-model="model" :multiple="multiple" :multiple-mode="multiple ? 'tag' : 'default'" :collapse-tags="true">
    <bk-option v-for="(name, id) in localOption" :key="id" :id="id" :name="name"></bk-option>
  </bk-select>
</template>
