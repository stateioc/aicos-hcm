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
import { computed, defineComponent, PropType, ref, watchEffect } from 'vue';
import { Select, Button } from 'bkui-vue';
import { Plus as PlusIcon } from 'bkui-vue/lib/icon';

const { BK_HCM_AJAX_URL_PREFIX } = window.PROJECT_CONFIG;

const { Option } = Select;

export default defineComponent({
  props: {
    modelValue: Number as PropType<number>,
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const list = ref([]);
    const loading = ref(false);

    const selected = computed({
      get() {
        return props.modelValue;
      },
      set(val) {
        emit('update:modelValue', val);
      },
    });

    watchEffect(async () => {
      loading.value = true;
      const result = await http.post(`${BK_HCM_AJAX_URL_PREFIX}/api/v1/web/cloud_areas/list`, {
        page: {
          start: 0,
          limit: 500,
        },
      });
      list.value = result?.data?.info ?? [];
      loading.value = false;
    });

    return () => (
      <Select
        filterable={true}
        modelValue={selected.value}
        onUpdate:modelValue={(val) => (selected.value = val)}
        loading={loading.value}>
        {list.value.map(({ id, name }) => (
          <Option key={id} value={id} label={name}></Option>
        ))}
        <div style={{ display: 'flex', padding: '8px 12px' }}>
          {{
            extension: () => (
              <Button text theme='primary'>
                <PlusIcon />
                新增
              </Button>
            ),
          }}
        </div>
      </Select>
    );
  },
});
