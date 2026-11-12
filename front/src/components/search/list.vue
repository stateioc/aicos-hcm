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
import { computed, useAttrs } from 'vue';
import { ModelProperty } from '@/model/typings';
import FormList from '@/components/form/list.vue';
defineOptions({ name: 'hcm-search-list' });

const model = defineModel<string | number | (string | number)[]>();

const props = withDefaults(defineProps<{ multiple: boolean; list: ModelProperty['list'] }>(), {
  multiple: true,
});

const localModel = computed({
  get() {
    if (props.multiple && model.value && !Array.isArray(model.value)) {
      return [model.value];
    }
    return model.value;
  },
  set(val) {
    model.value = val;
  },
});

const attrs = useAttrs();
</script>

<template>
  <form-list v-model="localModel" :list="list" :multiple="multiple" :collapse-tags="true" v-bind="attrs" />
</template>
