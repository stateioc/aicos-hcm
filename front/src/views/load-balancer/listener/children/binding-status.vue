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
import ResultSuccess from '@/assets/image/result-success.svg';
import ResultFailed from '@/assets/image/result-failed.svg';
import ResultWaiting from '@/assets/image/result-waiting.svg';
import ResultDefault from '@/assets/image/result-default.svg';
import StatusLoading from '@/assets/image/status_loading.png';
import { BINDING_STATUS_NAME, BindingStatusType, LAYER_7_LISTENER_PROTOCOL, ListenerProtocol } from '../../constants';
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';

const props = defineProps<{
  value: BindingStatusType;
  type: 'listener' | 'url';
  protocol?: ListenerProtocol;
}>();

const { t } = useI18n();

const isLayer7ListenerProtocol = computed(
  () => props.type === 'listener' && LAYER_7_LISTENER_PROTOCOL.includes(props.protocol),
);
const icon = computed(() => {
  switch (props.value) {
    case BindingStatusType.SUCCESS:
      return ResultSuccess;
    case BindingStatusType.FAILED:
      return ResultFailed;
    case BindingStatusType.UNBINDING:
      return ResultWaiting;
    case BindingStatusType.BINDING:
      return StatusLoading;
    default:
      return ResultDefault;
  }
});
</script>

<template>
  <template v-if="isLayer7ListenerProtocol">
    <i
      class="hcm-icon bkhcm-icon-38moxingshibai-01 text-gray font-normal cursor mr8"
      v-bk-tooltips="{ content: t('HTTP/HTTPS监听器的同步状态，请到URL列表查看') }"
    ></i>
    <span>--</span>
  </template>
  <template v-else>
    <div v-if="value" class="binding-status-wrap">
      <img class="status-icon" :class="{ 'spin-icon': value === 'binding' }" :src="icon" alt="" />
      <span>{{ BINDING_STATUS_NAME[value] }}</span>
    </div>
    <template v-else>--</template>
  </template>
</template>

<style scoped lang="scss">
.binding-status-wrap {
  display: flex;
  align-items: center;

  .status-icon {
    margin-right: 7px;
    width: 14px;
    height: 14px;
  }
}
</style>
