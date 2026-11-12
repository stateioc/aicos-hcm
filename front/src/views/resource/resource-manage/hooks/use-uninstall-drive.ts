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

/**
 * 卸载云硬盘相关事件和状态
 */
import { ref, h } from 'vue';

import UninstallDrive from '../children/dialog/uninstall-drive/uninstall-drive';

export default () => {
  const disk = ref({});
  const isShowUninstallDrive = ref(false);

  const handleUninstallDrive = (data: any) => {
    disk.value = data;
    isShowUninstallDrive.value = true;
  };

  return {
    isShowUninstallDrive,
    handleUninstallDrive,
    UninstallDrive: (props: any, { emit }: any) => {
      return h(UninstallDrive, {
        ...props,
        data: disk.value,
        onSuccess() {
          emit('success');
        },
      });
    },
  };
};
