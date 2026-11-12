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

import { deleteCookie } from '@/common/util';
import { defineStore } from 'pinia';
import { ref } from 'vue';

export default defineStore('usePagePermissionStore', () => {
  const hasPagePermission = ref(true);
  const permissionMsg = ref('');
  const setHasPagePermission = (val: boolean) => (hasPagePermission.value = val);
  const setPermissionMsg = (val: string) => (permissionMsg.value = val);

  const logout = () => {
    deleteCookie('bk_token');
    deleteCookie('bk_ticket');
    window.location.href = `${window.PROJECT_CONFIG.BK_LOGIN_URL}/?is_from_logout=1&c_url=${window.location.href}`;
  };

  return {
    hasPagePermission,
    setHasPagePermission,
    permissionMsg,
    setPermissionMsg,
    logout,
  };
});
