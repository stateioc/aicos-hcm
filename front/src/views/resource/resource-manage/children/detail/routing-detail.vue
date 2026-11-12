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
import DetailHeader from '../../common/header/detail-header';
import DetailTab from '../../common/tab/detail-tab';
import RouteInfo from '../components/route/route-info.vue';
import RouteSubnet from '../components/route/route-subnet.vue';

import { useRoute } from 'vue-router';
import useDetail from '../../hooks/use-detail';
import { Senarios, useWhereAmI } from '@/hooks/useWhereAmI';

const route = useRoute();
const { whereAmI } = useWhereAmI();

const routeTabs = [
  {
    name: '基本信息',
    value: 'detail',
  },
  {
    name: '关联子网',
    value: 'subnet',
  },
];

const { loading, detail } = useDetail('route_tables', route.query.id as string);
</script>

<template>
  <bk-loading :loading="loading">
    <detail-header>路由表：ID（{{ detail.id }}）</detail-header>
    <div class="i-detail-tap-wrap" :style="whereAmI === Senarios.resource && 'padding: 0;'">
      <detail-tab :tabs="routeTabs" class="route-tab">
        <template #default="type">
          <route-info v-if="type === 'detail'" :detail="detail" />
          <route-subnet v-if="type === 'subnet'" :detail="detail" />
        </template>
      </detail-tab>
    </div>
  </bk-loading>
</template>

<style lang="scss" scoped>
.w100 {
  width: 100px;
}

.w60 {
  width: 60px;
}
</style>
