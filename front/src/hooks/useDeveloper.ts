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

import { useDeveloperStore } from '@/stores';
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { usePagination } from './usePagination';

export function useMappingDeveloper(isMap = false) {
  const developerStore = useDeveloperStore();
  const route = useRoute();
  const list = ref([
    {
      email: 'lockiechen@tencent.com',
      username: 'roy',
      wework: 'lockiechen',
    },
    {
      email: 'roy@tencent.com',
      username: 'roy',
      wework: 'lockiechen',
    },
    {
      email: 'demo@tencent.com',
      username: 'roy',
      wework: 'demo',
    },
  ]);
  const { pagination, handleTotalChange, handlePageValueChange, handlePageLimitChange } = usePagination();

  watch(
    () => ({ ...pagination }),
    (newPagination) => {
      getDeveloperMap(newPagination);
    },
    { immediate: true },
  );

  async function getDeveloperMap(paginationConf: typeof pagination) {
    const data = await developerStore.fetchDeveloperMap({
      is_mapped: isMap,
      projectId: route.params.projectId,
      page: paginationConf.current,
      page_size: paginationConf.limit,
    });
    console.log(data);
    // handleTotalChange(data.count);
    // list.value = data.result;
  }

  return {
    list,
    pagination,
    handleTotalChange,
    handlePageValueChange,
    handlePageLimitChange,
  };
}
