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

import { computed, defineComponent, provide, ref } from 'vue';
import { RouterView } from 'vue-router';
import Header from './header';
import dayjs from 'dayjs';
import './index.scss';

export default defineComponent({
  setup() {
    const currentMonth = ref(dayjs().subtract(1, 'month').toDate());
    const bill_year = computed(() => currentMonth.value.getFullYear());
    const bill_month = computed(() => currentMonth.value.getMonth() + 1);
    provide('currentMonth', currentMonth);
    provide('bill_year', bill_year);
    provide('bill_month', bill_month);

    return () => (
      <div class='bill-manage-module'>
        <Header />
        <RouterView class='main-container'></RouterView>
      </div>
    );
  },
});
