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

import { defineComponent, inject, Ref, ref, watch } from 'vue';
import './index.scss';

import { Tab } from 'bkui-vue';
import { BkTabPanel } from 'bkui-vue/lib/tab';
import BillDetailRenderTable from './RenderTable';
import Search from '@/views/bill/bill/components/search';

import { useI18n } from 'vue-i18n';
import { VendorEnum } from '@/common/constant';

export default defineComponent({
  name: 'BillDetail',
  setup() {
    const { t } = useI18n();
    const bill_year = inject<Ref<number>>('bill_year');
    const bill_month = inject<Ref<number>>('bill_month');

    const types = ref([
      { name: VendorEnum.AWS, label: t('亚马逊云') },
      { name: VendorEnum.GCP, label: t('谷歌云') },
      { name: VendorEnum.AZURE, label: t('微软云') },
      { name: VendorEnum.HUAWEI, label: t('华为云') },
      { name: VendorEnum.ZENLAYER, label: t('zenlayer') },
    ]);
    const activeType = ref(VendorEnum.AWS);

    const searchRef = ref();
    const billDetailRenderTableRef = ref();

    watch([bill_year, bill_month], () => {
      searchRef.value?.handleSearch();
    });

    return () => (
      <div class='bill-detail-module'>
        <Tab v-model:active={activeType.value} type='card-grid'>
          {types.value.map(({ name, label }) => (
            <BkTabPanel key={name} name={name} label={label} renderDirective='if'>
              <Search
                ref={searchRef}
                searchKeys={['root_account_id', 'product_id', 'main_account_id']}
                vendor={[activeType.value]}
                onSearch={(rules) => billDetailRenderTableRef.value?.reloadTable(rules)}
                disableSearchHandler={(rules) => rules.filter((rule) => rule.field !== 'vendor').length === 0}
              />
              <BillDetailRenderTable ref={billDetailRenderTableRef} vendor={name} />
            </BkTabPanel>
          ))}
        </Tab>
      </div>
    );
  },
});
