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

import { viewTypes } from '@/router/router-config';
import { useProjectStore } from '@/stores/projects';
import { computed, onBeforeMount } from 'vue';
import { useRoute, useRouter } from 'vue-router';

export function useProjectList(all = false) {
  const router = useRouter();
  const route = useRoute();

  const projectStore = useProjectStore();
  const projects = computed(() => (all ? projectStore.devopsProjects : projectStore.metricProjects));
  const currentProjectId = computed(() => route.params.projectId as string);
  const currentProject = computed(() =>
    projects.value.list.find((project) => project.project_id === currentProjectId.value),
  );

  onBeforeMount(async () => {
    if (!projects.value.fetched) {
      all ? projectStore.fetchDevopsProjects() : projectStore.fetchMetricProjects();
    }
  });

  function handleProjectChange(projectId: string) {
    router.push({
      ...route,
      params: {
        viewType: viewTypes[0],
        ...route.params,
        projectId,
      },
    });
  }

  function getAdminByDeptId(dept_id: string) {
    return projectStore.orgAdminMap[dept_id]?.username ?? 'unknow';
  }

  return {
    projects,
    currentProjectId,
    currentProject,
    projectStore,
    handleProjectChange,
    getAdminByDeptId,
  };
}
