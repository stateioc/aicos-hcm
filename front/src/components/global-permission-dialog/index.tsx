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

import { defineComponent } from 'vue';
import PermissionDialog from '../permission-dialog';
import { useVerify } from '@/hooks';
import { useGlobalPermissionDialog } from '@/store/useGlobalPermissionDialog';

export default defineComponent({
  setup() {
    const globalPermissionDialogStore = useGlobalPermissionDialog();
    const { permissionParams, handlePermissionDialog, handlePermissionConfirm } = useVerify();

    return () => (
      <PermissionDialog
        v-model:isShow={globalPermissionDialogStore.isShow}
        params={permissionParams.value}
        onCancel={() => {
          globalPermissionDialogStore.setShow(false);
          handlePermissionDialog();
        }}
        onConfirm={(val) => {
          globalPermissionDialogStore.setShow(false);
          handlePermissionConfirm(val);
        }}
      />
    );
  },
});
