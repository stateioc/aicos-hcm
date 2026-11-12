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
import { ref, watch } from 'vue';
import { FieldList } from '../../../common/info-list/types';

const props = defineProps({
  detail: {
    type: Object,
  },
});

const fields = ref<FieldList>([
  {
    name: 'IP转发',
    prop: 'enable_ip_forwarding',
    render(val: boolean) {
      return val ? '是' : '否';
    },
  },
  {
    name: '子网',
    prop: 'cloud_subnet_id',
  },
  {
    name: '网关负载均衡器',
    prop: 'gatewayLoadBalancerId',
  },
  {
    name: '虚拟网络(VPC)',
    prop: 'cloud_vpc_id',
  },
]);

const columns = ref([]);
const ipConfigData = ref([]);

watch(
  () => props.detail,
  (detail) => {
    switch (detail.vendor) {
      case 'tcloud':
      case 'azure':
      case 'huawei':
        ipConfigData.value = detail.ip_configurations.map((data: any) => ({
          ...data,
          ...data.properties,
          publicIPAddress: data.properties?.public_ip_address?.properties?.ip_address || '--',
        }));

        columns.value = [
          {
            label: '名称',
            field: 'name',
          },
          {
            label: 'IP版本',
            field: 'private_ip_address_version',
          },
          {
            label: '类型',
            field: 'primary',
            render({ cell }: { cell: number }) {
              return cell ? '主要' : '辅助';
            },
          },
          {
            label: '专用IP地址',
            field: 'private_ip_address',
          },
          {
            label: '公共IP地址',
            field: 'publicIPAddress',
          },
        ];
        break;
    }
  },
  {
    deep: true,
    immediate: true,
  },
);
</script>

<template>
  <div class="ipconfig">
    <detail-info :detail="detail" :fields="fields" global-copyable />
    <bk-table class="mt20" row-hover="auto" :columns="columns" :data="ipConfigData" show-overflow-tooltip />
  </div>
</template>

<style lang="scss" scoped>
.ipconfig {
  :deep(.detail-info-main) {
    height: auto;
  }
}
</style>
