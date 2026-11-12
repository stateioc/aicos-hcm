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

import { RESOURCE_DETAIL_TABS } from '@/common/constant';
import { Tab } from 'bkui-vue';
import { BkTabPanel } from 'bkui-vue/lib/tab';
import { defineComponent, ref, watch } from 'vue';
import { RouterView, useRoute, useRouter } from 'vue-router';
import './index.scss';
import { useResourceAccountStore } from '@/store/useResourceAccountStore';
import AccountManage from '@/views/resource/accountmanage/index.vue';

export default defineComponent({
  setup() {
    const router = useRouter();
    const route = useRoute();
    const resourceAccountStore = useResourceAccountStore();

    const activeTab = ref(route.path || RESOURCE_DETAIL_TABS[0].key);
    watch(
      () => activeTab.value,
      (val) => {
        if (!resourceAccountStore.resourceAccount?.id) return;
        router.push({
          path: val,
          query: route.query,
        });
      },
      {
        immediate: true,
      },
    );
    return () => (
      <>
        <div class={'account-info-container'}>
          <Tab v-model:active={activeTab.value} type='card-grid'>
            {!resourceAccountStore.resourceAccount?.id ? (
              <AccountManage />
            ) : (
              RESOURCE_DETAIL_TABS.map(({ key, label }) => (
                <BkTabPanel key={key} label={label} name={key} renderDirective='if'>
                  <RouterView />
                </BkTabPanel>
              ))
            )}
          </Tab>
        </div>
      </>
    );
  },
});
