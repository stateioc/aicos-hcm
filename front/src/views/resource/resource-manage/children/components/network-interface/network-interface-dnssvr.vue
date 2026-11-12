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
import { h, ref, watchEffect } from 'vue';

const props = defineProps({
  detail: {
    type: Object,
  },
});

const columns = ref([
  {
    label: () => h('b', '应用的 DNS 服务器'),
    field: 'name',
  },
]);

const data = ref([]);

watchEffect(() => {
  data.value = props.detail.dns_settings?.applied_dns_servers?.map((item: any) => ({ name: item }));
});
</script>

<template>
  <bk-table row-hover="auto" :columns="columns" :data="data" show-overflow-tooltip />
</template>
