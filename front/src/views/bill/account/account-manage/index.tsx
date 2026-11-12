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
import './index.scss';

import { Tab } from 'bkui-vue';
import Panel from './panel';
import { BkTabPanel } from 'bkui-vue/lib/tab';

import { AccountLevelEnum } from './constants';
import { useVerify } from '@/hooks';

export default defineComponent({
  setup() {
    const { authVerifyData } = useVerify();

    const accountLevel = ref(AccountLevelEnum.FirstLevel);

    const tabs = [
      {
        key: AccountLevelEnum.SecondLevel,
        label: '二级账号',
      },
    ];

    // 一级账号权限校验
    authVerifyData.value?.permissionAction?.root_account_find &&
      tabs.unshift({
        key: AccountLevelEnum.FirstLevel,
        label: '一级账号',
      });

    return () => (
      <div class={'account-manage-wrapper'}>
        <div class={'header'}>
          <p class={'title'}>云账号管理</p>
        </div>
        <Tab v-model:active={accountLevel.value} type='card-grid' class={'account-table'}>
          {tabs.map(({ key, label }) => (
            <BkTabPanel key={key} label={label} name={key} renderDirective='if'>
              <Panel accountLevel={accountLevel.value} authVerifyData={authVerifyData.value} />
            </BkTabPanel>
          ))}
        </Tab>
      </div>
    );
  },
});
