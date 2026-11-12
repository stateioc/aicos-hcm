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
import { computed, watchEffect } from 'vue';
import CombineRequest from '@blueking/combine-request';
import { useUserStore } from '@/store/user';

const props = defineProps<{ value: string | string[] }>();

const localValue = computed(() => {
  if (!props.value) {
    return [];
  }
  return Array.isArray(props.value) ? props.value : [props.value];
});

const displayValue = computed(() => {
  const names = localValue.value.map((username) => {
    // 每次从全局store中查询获取
    const user = userStore.userList.find((user) => user.username === username);
    if (!user) {
      return `${username}(--)`;
    }
    return `${user.username}(${user.display_name})`;
  });
  return names?.join?.(';') || '--';
});

const userStore = useUserStore();

const combineRequest = CombineRequest.setup(Symbol.for('user-value'), (users) => {
  const uniqueUsers = [...new Set((users as string[][]).reduce((acc, cur) => acc.concat(cur), []))];
  userStore.getUserByName(uniqueUsers);
});

watchEffect(() => {
  if (!localValue.value.length) {
    return;
  }

  const newUsers = localValue.value.filter(
    (username) => !userStore.userList.some((item) => item.username === username),
  );

  if (newUsers.length) {
    combineRequest.add(newUsers);
  }
});
</script>

<template>
  {{ displayValue }}
</template>
