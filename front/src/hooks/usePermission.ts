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

import { usePermissionStore } from '@/stores';
import { Permission, PermissionType, Role } from '@/typings';
import { Message } from 'bkui-vue';
import { ref, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRoute } from 'vue-router';

export function usePermission() {
  const permissionStore = usePermissionStore();
  const { t } = useI18n();
  const route = useRoute();

  const permissionModel = ref(initPermission());
  const isSaving = ref(false);

  watch(
    () => [...permissionStore.permissions],
    (permissions) => {
      permissionModel.value = initPermission(permissions);
    },
  );

  watch(
    () => route.params.projectId,
    (pid) => {
      permissionStore.fetchPermission(pid as string);
    },
    { immediate: true },
  );

  function initPermission(permissions = permissionStore.permissions) {
    return permissions.reduce(
      (acc: any, item: Permission) => {
        acc[item.role][item.type] = {
          ...item,
          members: [...item.members],
        };
        return acc;
      },
      {
        [Role.ADMIN]: {
          [PermissionType.USER]: {},
          [PermissionType.ORG]: {},
        },
        [Role.MEMBER]: {
          [PermissionType.USER]: {},
          [PermissionType.ORG]: {},
        },
      },
    );
  }

  async function savePermissions() {
    if (isSaving.value) return;
    try {
      isSaving.value = true;
      const permissions = Object.keys(permissionModel.value).reduce((acc, key) => {
        acc.push(...Object.values(permissionModel.value[key]));
        return acc;
      }, []);
      await permissionStore.savePermission({
        project_id: route.params.projectId as string,
        data: permissions,
      });

      Message({
        message: t('savePermissionSuccess'),
        theme: 'success',
      });
    } catch (error) {
      console.error(error);
    } finally {
      isSaving.value = false;
    }
  }

  return {
    permissionModel,
    savePermissions,
    isSaving,
  };
}
