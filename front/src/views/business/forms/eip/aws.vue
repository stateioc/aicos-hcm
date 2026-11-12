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
import { ref, watch, defineEmits, defineExpose } from 'vue';

const props = defineProps({
  region: {
    type: String,
  },
});

const emit = defineEmits(['change']);

const formData = ref({
  public_ipv4_pool: '',
  network_border_group: props.region,
  eip_count: 1,
});
const formRef = ref(null);

const handleChange = () => {
  formData.value.network_border_group = props.region;
  emit('change', formData.value);
};

const validate = () => {
  return formRef.value.validate();
};

watch(() => formData, handleChange, {
  immediate: true,
  deep: true,
});

defineExpose([validate]);
</script>

<template>
  <bk-form label-width="150" ref="formRef" :model="formData">
    <bk-form-item label="网络边界组" required>
      {{ region }}
    </bk-form-item>
    <bk-form-item label="公有IPv4地址池">
      <bk-radio model-value="Amazon的IPv4地址池" label="Amazon的IPv4地址池" />
    </bk-form-item>
    <bk-form-item label="数量" required>1</bk-form-item>
  </bk-form>
</template>
