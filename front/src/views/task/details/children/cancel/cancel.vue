<!--
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
-->

<script setup lang="ts">
import { Message } from 'bkui-vue';
import { type ITaskItem, ITaskStatusItem, useTaskStore } from '@/store';
import { useWhereAmI } from '@/hooks/useWhereAmI';
import { ResourceTypeEnum } from '@/common/resource-constant';
import { TaskStatus } from '@/views/task/typings';

const props = defineProps<{ resource: ResourceTypeEnum; info: Partial<ITaskItem>; status: ITaskStatusItem['state'] }>();

const { getBizsId } = useWhereAmI();
const taskStore = useTaskStore();

const handleConfirm = async () => {
  try {
    await taskStore.taskCancel([props.info.id], getBizsId());
  } catch {
    Message({ theme: 'error', message: '终止任务失败' });
  }
};
</script>

<template>
  <Teleport defer to="#breadcrumbExtra">
    <bk-pop-confirm
      trigger="click"
      width="350"
      content="终止任务，仅终止未执行的部分，已执行的部分不受影响，点击终止任务后，请关注已执行部分的任务"
      @confirm="handleConfirm"
    >
      <bk-button :disabled="status !== TaskStatus.RUNNING">终止任务</bk-button>
    </bk-pop-confirm>
  </Teleport>
</template>
