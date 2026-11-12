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
import { useResourceStore } from '@/store';
import DeleteButton from './single-delete-button.vue';

const props = withDefaults(defineProps<{ id: string; disabled: boolean }>(), {
  disabled: true,
});

const emit = defineEmits<(e: 'success') => void>();

const resourceStore = useResourceStore();
const loading = defineModel('loading', { default: false });

const handleDelete = async () => {
  loading.value = true;
  try {
    await resourceStore.deleteBatch('security_groups', { ids: [props.id] });
    emit('success');
  } finally {
    loading.value = false;
  }
};
</script>
<template>
  <delete-button :disabled="disabled" :loading="loading" @del="handleDelete"></delete-button>
</template>
