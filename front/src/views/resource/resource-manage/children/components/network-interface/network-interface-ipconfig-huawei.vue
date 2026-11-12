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
import { ref, watchEffect } from 'vue';

const props = defineProps({
  detail: {
    type: Object,
  },
});

const columns = ref([
  {
    label: '类型',
    field: 'type',
  },
  {
    label: '内网IP',
    field: 'internalIp',
  },
  {
    label: '弹性公网IP',
    field: 'publicIp',
  },
]);

const ipConfigData = ref([]);

watchEffect(() => {
  ipConfigData.value = [
    {
      type: '私有IP地址',
      internalIp: props.detail?.private_ipv4?.join(',') || '--',
      publicIp: props.detail?.public_ipv4?.join(',') || '--',
    },
    {
      type: 'IPv6地址',
      internalIp: props.detail?.private_ipv6?.join(',') || '--',
      publicIp: props.detail?.public_ipv6?.join(',') || '--',
    },
  ];

  props.detail?.virtual_ip_list?.forEach(({ ip, elasticity_ip }: { ip: string; elasticity_ip: string }) => {
    ipConfigData.value.push({
      type: '虚拟IP地址',
      internalIp: ip || '--',
      publicIp: elasticity_ip || '--',
    });
  });
});
</script>

<template>
  <bk-table row-hover="auto" :columns="columns" :data="ipConfigData" show-overflow-tooltip />
</template>
