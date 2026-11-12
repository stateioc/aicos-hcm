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

const emit = defineEmits(['change']);

const formData = ref({
  eip_name: '',
  eip_count: 1,
  service_provider: 'BGP',
  address_type: 'EIP',
});
const formRef = ref(null);
const rules = {
  eip_count: [
    {
      validator: (value: number) => value > 0,
      message: '请输入大于0的整数',
      trigger: 'blur',
    },
  ],
  eip_name: [
    {
      validator: (value: string) => {
        return value.trim().length > 0;
      },
      message: '名称必填',
      trigger: 'blur',
    },
  ],
};

const handleChange = () => {
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
  <bk-form label-width="150" ref="formRef" :model="formData" :rules="rules">
    <bk-form-item label="名称" property="eip_name" required>
      <bk-input v-model="formData.eip_name" placeholder="请输入名称" />
    </bk-form-item>
    <bk-form-item label="IP地址类型" required>
      <bk-radio model-value="常规BGP IP" label="常规BGP IP" />
    </bk-form-item>
    <bk-form-item label="数量" property="eip_count" required>
      <bk-input v-model.number="formData.eip_count" type="number" placeholder="请输入数量" />
    </bk-form-item>
  </bk-form>
</template>
