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

<template>
  <div class="iam-approval-process-wrapper" @click.stop="handleOpenProcessLink">
    <i class="icon hcm-icon bkhcm-icon-angle-up-fill"></i>
    {{ defaultText }}
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useI18n } from 'vue-i18n';
export default defineComponent({
  name: 'ApplyProcess',
  props: {
    link: {
      type: String,
    },
  },
  setup(props) {
    const { t } = useI18n();
    const defaultText = t('查看审批详情');
    const handleOpenProcessLink = () => {
      window.open(props.link);
    };

    return {
      defaultText,
      handleOpenProcessLink,
    };
  },
});
</script>
<style lang="scss" scoped>
.iam-approval-process-wrapper {
  margin: 20px 0;
  padding: 0 20px;
  line-height: 64px;
  background: #fff;
  border-radius: 2px;
  box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.05);
  font-size: 14px;
  color: #3a84ff;
  cursor: pointer;
  &:hover {
    color: #699df4;
  }
}
</style>
