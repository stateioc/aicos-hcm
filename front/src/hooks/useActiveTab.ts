/*
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
 */

import { ref, watchEffect } from 'vue';
import { useRouter, useRoute } from 'vue-router';

/**
 * Tab组件切换Panel, url中query参数(type)为标识
 */
export default (initialValue: string) => {
  const router = useRouter();
  const route = useRoute();
  const activeTab = ref(initialValue);

  // change-handler
  const handleActiveTabChange = (v: string) => {
    // tab切换
    activeTab.value = v;
    // 路由切换
    router.push({ query: { ...route.query, type: v } });
  };

  // 监听route.query.type的变化, tab状态保持
  watchEffect(() => {
    handleActiveTabChange(route.query.type as string);
  });

  return {
    activeTab,
    handleActiveTabChange,
  };
};
