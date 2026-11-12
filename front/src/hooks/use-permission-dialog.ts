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

import { inject, provide, reactive } from 'vue';
import { permissionDialogSymbol } from '@/constants/provide-symbols';
import { type IVerifyResult } from '@/store/auth';

export type PermissionDialogContext = {
  isShow: boolean;
  permission: IVerifyResult['permission'];
  done?: () => void;
};

export type PermissionDialogOptions = Pick<PermissionDialogContext, 'done'>;

export const providePermissionDialog = () => {
  // 使用时需避免解构会丢失响应
  const context = reactive<PermissionDialogContext>({
    isShow: false,
    permission: null,
  });

  provide(permissionDialogSymbol, context);

  return context;
};

export default function usePermissionDialog() {
  const permissionDialogContext = inject<PermissionDialogContext>(permissionDialogSymbol);

  const show = (permission: PermissionDialogContext['permission'], options?: PermissionDialogOptions) => {
    permissionDialogContext.permission = permission;
    permissionDialogContext.done = options?.done;
    permissionDialogContext.isShow = true;
  };

  return {
    show,
  };
}
