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
import { inject, Ref } from 'vue';
import { ILoadBalancerDetails } from '@/store/load-balancer/clb';
import ClbInfo from '@/views/business/load-balancer/clb-view/specific-clb-manager/clb-detail';
import { IAuthSign } from '@/common/auth-service';

interface IProps {
  lbId: string;
  details: ILoadBalancerDetails;
  uploadDetails: (id: string) => void;
}

defineProps<IProps>();

const currentGlobalBusinessId = inject<Ref<number>>('currentGlobalBusinessId');
const clbOperationAuthSign = inject<Ref<IAuthSign | IAuthSign[]>>('clbOperationAuthSign');
</script>

<template>
  <div class="clb-info-container">
    <clb-info
      :id="lbId"
      :current-global-business-id="currentGlobalBusinessId"
      :detail="details"
      :get-details="uploadDetails"
      :clb-operation-auth-sign="clbOperationAuthSign"
    />
  </div>
</template>

<style scoped lang="scss">
.clb-info-container {
  padding-top: 24px;
  height: 100%;
}
</style>
