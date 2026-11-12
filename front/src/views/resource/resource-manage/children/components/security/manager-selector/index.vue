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

<script lang="ts" setup>
import { ref, nextTick, watch } from 'vue';

export interface IChargeSelectorProps {
  manager?: string;
  bakManager?: string;
}

defineOptions({ name: 'SecurityGroupManagerSelector' });

const props = withDefaults(defineProps<IChargeSelectorProps>(), {
  manager: '',
  bakManager: '',
});

const formRef = ref(null);
const formData = ref({ manager: props.manager, bak_manager: props.bakManager });

const validate = () => {
  return formRef.value.validate();
};

const reset = () => {
  formData.value.manager = '';
  formData.value.bak_manager = '';
  nextTick(() => formRef.value?.clearValidate());
};

watch(
  () => [props.manager, props.bakManager],
  (val) => {
    const [manager, bakManager] = val;
    formData.value.manager = manager;
    formData.value.bak_manager = bakManager;
  },
);

defineExpose({ validate, formData, reset });
</script>

<template>
  <bk-form class="manager-selector" label-width="150" form-type="vertical" :model="formData" ref="formRef">
    <bk-form-item label="主负责人" property="manager" required>
      <hcm-form-user :multiple="false" v-model="formData.manager"></hcm-form-user>
    </bk-form-item>
    <bk-form-item label="备份负责人" property="bak_manager" required>
      <hcm-form-user :multiple="false" v-model="formData.bak_manager"></hcm-form-user>
    </bk-form-item>
  </bk-form>
</template>

<style lang="scss" scoped>
.manager-selector {
  display: flex;
  justify-content: space-around;
  gap: 24px;

  .bk-form-item {
    flex-basis: 50%;
  }
}
</style>
