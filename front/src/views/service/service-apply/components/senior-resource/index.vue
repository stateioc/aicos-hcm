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

<template>
  <div class="senior-resource">
    <ResourceCard :list="list" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import ResourceCard from '../resource-card/index.vue';

export default defineComponent({
  name: 'SeniorResource',
  components: {
    ResourceCard,
  },
  setup() {
    const list = ref(
      new Array(Math.ceil(Math.random() * 900) + 100).fill('').map((_, index) => ({
        name: '高级高级高级高级高级高级高级高级',
        id: index + 1,
        btnText: '立即录入',
      })),
    );

    const handleApply = () => {
      console.log('立即申请');
    };

    return {
      list,
      handleApply,
    };
  },
});
</script>
