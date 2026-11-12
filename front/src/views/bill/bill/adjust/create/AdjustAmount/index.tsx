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

import { PropType, computed, defineComponent } from 'vue';
import './index.scss';
import { formatBillCost } from '@/utils';

export default defineComponent({
  props: {
    adjustData: Object as PropType<{
      increaseSum: number;
      decreaseSum: number;
    }>,
    currency: String as PropType<'RMB' | 'USD'>,
  },
  setup(props) {
    const moneySign = computed(() => {
      return props.currency === 'RMB' ? '￥' : '$';
    });
    return () => (
      <div class={'amount-wrapper'}>
        <span class={'item'}>
          增加：
          <span class={'money'}>{`${moneySign.value} ${formatBillCost(`${props.adjustData.increaseSum}`)}`}</span>
        </span>
        <span class={'item'}>
          减少：
          <span class={'money'}>{`${moneySign.value} ${formatBillCost(`${props.adjustData.decreaseSum}`)}`}</span>
        </span>
      </div>
    );
  },
});
