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

import { defineComponent, ref } from 'vue';

import { Tab } from 'bkui-vue';
import { BkTabPanel } from 'bkui-vue/lib/tab';
import PrimaryAccount from '../primary';
import SubAccount from '../sub';
import OperationProduct from '../product';

import { useI18n } from 'vue-i18n';

export default defineComponent({
  name: 'BillSummaryManage',
  setup() {
    const { t } = useI18n();

    const activeTab = ref('primary');
    const tabs = ref([
      { name: 'primary', label: t('一级账号'), Component: PrimaryAccount },
      { name: 'sub', label: t('二级账号'), Component: SubAccount },
      { name: 'product', label: '业务', Component: OperationProduct },
    ]);

    return () => (
      <Tab v-model:active={activeTab.value} type='card-grid'>
        {tabs.value.map(({ name, label, Component }) => (
          <BkTabPanel key={name} name={name} label={label} renderDirective='if'>
            <Component />
          </BkTabPanel>
        ))}
      </Tab>
    );
  },
});
