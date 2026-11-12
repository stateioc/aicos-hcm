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
import TcloudInfo from './components/tcloud-info.vue';
import AwsInfo from './components/aws-info.vue';
import GcpInfo from './components/gcp-info.vue';
import AzureInfo from './components/azure-info.vue';
import HuaweiInfo from './components/huawei-info.vue';
import OtherInfo from './components/other-info.vue';
import { VendorEnum } from '@/common/constant';

const props = defineProps<{ data: any; type: VendorEnum }>();

const componentMap: { [key in VendorEnum]?: any } = {
  tcloud: TcloudInfo,
  huawei: HuaweiInfo,
  azure: AzureInfo,
  gcp: GcpInfo,
  aws: AwsInfo,
  other: OtherInfo,
};

const renderComponent = componentMap[props.type];
</script>

<template>
  <component :is="renderComponent" :data="props.data"></component>
</template>
<style lang="scss" scoped>
.f-right {
  float: right;
}
</style>
