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
import { ITargetGroupDetails } from '@/store/load-balancer/target-group';
import { DisplayFieldFactory, DisplayFieldType } from '../../children/display/field-factory';
import usePage from '@/hooks/use-page';

import DataList from '../../children/display/data-list.vue';

interface IProps {
  loading?: boolean;
  list: ITargetGroupDetails['target_list'];
  smallPagination?: boolean;
}

const props = withDefaults(defineProps<IProps>(), {
  smallPagination: true,
});

const columnProperties = DisplayFieldFactory.createModel(DisplayFieldType.RS).getProperties();

const { pagination } = usePage(false);
Object.assign(pagination, { small: props.smallPagination, layout: ['total', 'limit', 'list'] });
</script>

<template>
  <data-list
    v-bkloading="{ loading }"
    :columns="columnProperties"
    :list="list"
    :enable-query="false"
    :pagination="{ ...pagination }"
    :remote-pagination="false"
  />
</template>

<style scoped lang="scss"></style>
