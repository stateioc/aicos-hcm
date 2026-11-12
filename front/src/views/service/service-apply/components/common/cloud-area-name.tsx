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

import http from '@/http';
import { defineComponent, PropType, ref, watchEffect } from 'vue';
import { Input } from 'bkui-vue';
const { BK_HCM_AJAX_URL_PREFIX } = window.PROJECT_CONFIG;

export default defineComponent({
  props: {
    id: Number as PropType<number>,
  },
  setup(props) {
    const name = ref('');

    watchEffect(async () => {
      if (props.id === null) {
        name.value = '--';
        return;
      }

      if (props.id !== -1) {
        const result = await http.post(`${BK_HCM_AJAX_URL_PREFIX}/api/v1/web/cloud_areas/list`, {
          id: props.id,
        });
        name.value = result?.data?.info?.[0]?.name;
      } else {
        name.value = '未绑定管控区域';
      }
    });

    return () => <Input disabled v-model={name.value}></Input>;
  },
});
