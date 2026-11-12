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
  <div class="example2">
    <bk-card title="当前登陆人信息">
      <div class="user_name">用户名： {{$store.getters.user.username}}</div>
      <div class="avatar_url">头像： <img :src="$store.getters.user.avatar_url" alt=""></div>
    </bk-card>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      initDateTime: new Date(),
    };
  },
  created() {
  },
  methods: {
  },
};
</script>

<style scoped>
    @import './index.css';
</style>
