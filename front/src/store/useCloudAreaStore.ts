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

import { defineStore } from 'pinia';
import { ref } from 'vue';
import { useAccountStore } from './account';

export const useCloudAreaStore = defineStore('useCloudAreaStore', () => {
  const cloudAreaMap = ref<Map<number, string>>(new Map());
  const cloudAreaList = ref<{ id: number; name: string }[]>([]);
  const { getAllCloudAreas } = useAccountStore();

  const fetchAllCloudAreas = async () => {
    const res = await getAllCloudAreas();
    cloudAreaList.value = res?.data?.info || [];
    for (const { id, name } of cloudAreaList.value) {
      cloudAreaMap.value.set(id, name);
    }
    return cloudAreaList.value;
  };

  const getNameFromCloudAreaMap = (id: number) => {
    return cloudAreaMap.value.get(id) || '';
  };

  return {
    cloudAreaMap,
    cloudAreaList,
    fetchAllCloudAreas,
    getNameFromCloudAreaMap,
  };
});
