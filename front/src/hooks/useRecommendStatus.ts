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

import http from '@/api/http';
import { useAccessSourceStore } from '@/stores';
import { Status } from '@/typings';
import { classes } from '@/utils/utils';
import { computed, onBeforeMount, ref } from 'vue';
import { RouteParams, useRoute } from 'vue-router';

export function useRecommendStatus() {
  const accessSourceStore = useAccessSourceStore();
  const route = useRoute();
  const fetching = ref(true);
  const mappedStatus = ref<Map<string, Status>>();
  const unMappedStatus = ref([]);
  const libName = ref('');

  onBeforeMount(() => {
    fetchPersonalStatus(route.params);
  });

  if (accessSourceStore.recommendStatus.length === 0) {
    accessSourceStore.fetchRecommendStatus();
  }

  const mappingStatus = computed(() =>
    accessSourceStore.recommendStatus.map((status: Status) => {
      const isMap = !!mappedStatus.value?.has(status.status_map);
      const personalStatus = mappedStatus.value?.get(status.status_map);
      const cls = classes(
        {
          active: isMap,
        },
        'bk-metrics-status-block',
      );
      return {
        ...status,
        is_mapped: isMap,
        ...(isMap
          ? {
              status_name: personalStatus?.status_name,
              status: personalStatus?.status,
            }
          : {}),
        cls,
      };
    }),
  );

  async function fetchPersonalStatus({ projectId, platform, identification }: RouteParams) {
    try {
      fetching.value = true;
      const list: Status[] = await http.get('/status/map/', {
        params: {
          platform,
          identification,
          project_id: projectId,
        },
      });
      const unMapped = list.filter((status) => !status.is_mapped);
      const mapped = list.reduce((acc: Map<string, Status>, status: Status) => {
        if (status.is_mapped) {
          acc.set(status.status_map, status);
        }
        return acc;
      }, new Map());

      mappedStatus.value = mapped;
      unMappedStatus.value = unMapped;
      libName.value = list?.[0]?.demand_base_name;
    } catch (error) {
      return {};
    } finally {
      fetching.value = false;
    }
  }

  function updateMappedStatus(statusMap: string, dragStatus: Status) {
    mappedStatus.value.set(statusMap, {
      ...dragStatus,
      is_mapped: true,
      status_map: statusMap,
    });

    if (!dragStatus.is_mapped) {
      unMappedStatus.value = unMappedStatus.value.filter((status) => status.status_name !== dragStatus.status_name);
    } else if (mappedStatus.value.has(dragStatus.status_map)) {
      mappedStatus.value.delete(dragStatus.status_map);
    }
  }

  function removeMappedStatus(dragStatus: Status) {
    mappedStatus.value.delete(dragStatus.status_map);
    unMappedStatus.value.push({
      status: dragStatus.status,
      status_name: dragStatus.status_name,
      is_mapped: false,
    });
  }
  return {
    fetching,
    libName,
    unMappedStatus,
    mappingStatus,
    fetchPersonalStatus,
    updateMappedStatus,
    removeMappedStatus,
  };
}
