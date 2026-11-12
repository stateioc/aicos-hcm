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
import { ref, computed } from 'vue';
import { useAccountStore } from './account';

export const useBusinessMapStore = defineStore('businessMapStore', () => {
  const businessMap = ref<Map<number, string>>(new Map());
  const businessMapSize = computed(() => businessMap.value.size);
  const businessList = ref([]);
  // name 映射 id
  const businessNameToIDMap = computed(() => {
    const map = new Map();
    businessMap.value.forEach((value, key) => {
      if (!map.has(value)) {
        map.set(value, key);
      }
    });
    return map;
  });

  const accountStore = useAccountStore();
  const fetchBusinessMap = async () => {
    const { data } = await accountStore.getBizList();
    if (data && data.length > 0) {
      businessList.value = data;
      businessMap.value = new Map();
      for (const { id, name } of data) {
        businessMap.value.set(id, name);
      }
    }
  };

  const getNameFromBusinessMap = (id: number) => {
    return businessMap.value.get(id) || '';
  };

  return {
    businessMap,
    businessNameToIDMap,
    businessList,
    businessMapSize,
    fetchBusinessMap,
    getNameFromBusinessMap,
  };
});
