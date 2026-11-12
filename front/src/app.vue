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
import { onMounted, useTemplateRef } from 'vue';
import { provideBreadcrumb } from '@/hooks/use-breadcrumb';
import { providePermissionDialog } from '@/hooks/use-permission-dialog';
import Home from '@/views/home';
import Notice from '@/views/notice/index.vue';
import PermissionApplyDialog from '@/components/permission/apply-dialog.vue';
import { useChromeNotice } from '@/utils/chrome-notice';

const { ENABLE_NOTICE } = window.PROJECT_CONFIG;

// 面包屑
provideBreadcrumb();

// 权限申请弹窗
const permissionDialogContext = providePermissionDialog();

const permissionDialogRef = useTemplateRef<InstanceType<typeof PermissionApplyDialog>>('permission-dialog');

onMounted(() => {
  window.hcmPermissionDialog = permissionDialogRef.value;
  useChromeNotice();
});
</script>

<template>
  <div class="full-page flex-column">
    <Notice v-if="ENABLE_NOTICE === 'true'" />
    <Home class="flex-1"></Home>
  </div>
  <PermissionApplyDialog
    ref="permission-dialog"
    v-model="permissionDialogContext.isShow"
    :permission="permissionDialogContext.permission"
    :done="permissionDialogContext.done"
  />
</template>
