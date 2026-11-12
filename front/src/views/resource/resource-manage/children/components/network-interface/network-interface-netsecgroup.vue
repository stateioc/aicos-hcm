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
import DetailInfo from '@/views/resource/resource-manage/common/info/detail-info';
import { reactive, ref, watchEffect } from 'vue';
import { FieldList } from '../../../common/info-list/types';

const props = defineProps({
  detail: {
    type: Object,
  },
});

const fields = ref<FieldList>([
  {
    name: '网络安全组',
    prop: 'cloud_security_group_id',
  },
]);

const data = reactive({
  cloud_security_group_id: '',
});

watchEffect(() => {
  data.cloud_security_group_id = props.detail?.cloud_security_group_id;
});
</script>

<template>
  <detail-info :detail="data" :fields="fields" global-copyable :col="1" />
</template>
