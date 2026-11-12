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
import NoticeComponent from '@blueking/notice-component';
import '@blueking/notice-component/dist/style.css';
import { useCommonStore } from '@/store';

const commonStore = useCommonStore();
const { BK_HCM_AJAX_URL_PREFIX } = window.PROJECT_CONFIG;

// 是否含有跑马灯类型公告， 如果有跑马灯， navigation的高度可能需要减去40px， 避免页面出现滚动条
// 公告列表change事件回调， isShow代表是否含有跑马灯类型公告
const showAlertChange = function (isShow: boolean) {
  commonStore.setIsNoticeAlert(isShow);
};
</script>

<template>
  <NoticeComponent
    :api-url="`${BK_HCM_AJAX_URL_PREFIX}/api/v1/web/notice/current_announcements`"
    @show-alert-change="showAlertChange"
  />
</template>

<style scoped></style>
