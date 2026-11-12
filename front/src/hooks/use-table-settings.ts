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

import { ModelPropertyColumn } from '@/model/typings';
import { type Settings } from 'bkui-vue/lib/table/props';
import { ref } from 'vue';

type UseTableSettingsOptions = {
  defaults?: ModelPropertyColumn['id'][];
};

export default function useTableSettings(columns: ModelPropertyColumn[], options?: UseTableSettingsOptions) {
  const { defaults = [] } = options || {};
  const settings = ref<Settings>({
    fields: [],
    checked: [],
    trigger: 'manual',
  });

  columns.forEach((col, index) => {
    settings.value.fields.push({
      label: col.name,
      field: col.id,
      disabled: index < 3,
    });
  });

  if (defaults?.length) {
    settings.value.checked = defaults.slice();
  } else {
    settings.value.checked = columns.filter((col) => !col.defaultHidden).map((col) => col.id);
  }

  return {
    settings,
  };
}
