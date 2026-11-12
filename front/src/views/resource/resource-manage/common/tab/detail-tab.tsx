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

import { defineComponent, PropType, ref } from 'vue';

import './detail-tab.scss';

type Tab = {
  name: string;
  value: string;
};

export default defineComponent({
  props: {
    tabs: Array as PropType<Tab[]>,
    active: String as PropType<any>,
    onChange: Function as PropType<(val: string) => void>,
  },

  setup(props) {
    const activeTab = ref(props.active || props.tabs[0].value);

    return {
      activeTab,
    };
  },

  render() {
    return (
      <>
        <bk-tab
          v-model:active={this.activeTab}
          type='card-grid'
          class={`detail-tab-main ${this.$attrs?.class}`}
          onChange={this.onChange}>
          {this.tabs.map((tab) => {
            return (
              <>
                <bk-tab-panel name={tab.value} label={tab.name} key={tab.name}>
                  {tab.value === this.activeTab ? this.$slots.default(this.activeTab) : ''}
                </bk-tab-panel>
              </>
            );
          })}
        </bk-tab>
      </>
    );
  },
});
