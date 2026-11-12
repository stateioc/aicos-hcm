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
import { useI18n } from 'vue-i18n';
import { ThemeEnum } from 'bkui-vue/lib/shared';
import { IOverflowTooltipOption } from 'bkui-vue/lib/table/props';

interface IProps {
  disabled?: boolean;
  loading?: boolean;
  confirmText?: string;
  confirmButtonTheme?: ThemeEnum;
  cancelText?: string;
  tooltips?: IOverflowTooltipOption;
}

withDefaults(defineProps<IProps>(), {
  disabled: false,
  loading: false,
  confirmText: '确定',
  confirmButtonTheme: ThemeEnum.PRIMARY,
  cancelText: '取消',
  tooltips: () => ({ disabled: true, content: '' }),
});
const emit = defineEmits(['confirm', 'closed']);

const { t } = useI18n();
</script>

<template>
  <bk-button
    v-bk-tooltips="tooltips"
    class="button mr8"
    :theme="confirmButtonTheme"
    :disabled="disabled"
    :loading="loading"
    @click="emit('confirm')"
  >
    {{ t(confirmText) }}
  </bk-button>
  <bk-button :disabled="loading" @click="emit('closed')">
    {{ t(cancelText) }}
  </bk-button>
</template>

<style scoped lang="scss">
.button {
  min-width: 64px;
}
</style>
