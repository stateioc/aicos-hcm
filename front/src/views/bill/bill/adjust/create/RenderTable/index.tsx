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

import { defineComponent } from 'vue';
import { Ediatable, HeadColumn } from '@blueking/ediatable';
import { useI18n } from 'vue-i18n';
export default defineComponent({
  props: {
    edit: Boolean,
  },
  setup(props, { slots }) {
    const { t } = useI18n();
    return () => (
      <Ediatable>
        {{
          default: () => (
            <>
              <HeadColumn required minWidth={120} width={450}>
                {t('调整方式')}
              </HeadColumn>
              <HeadColumn required minWidth={120} width={450}>
                {t('业务')}
              </HeadColumn>
              <HeadColumn required minWidth={120} width={450}>
                {t('二级账号')}
              </HeadColumn>
              <HeadColumn required minWidth={120} width={450}>
                {t('资源类型')}
              </HeadColumn>
              <HeadColumn required minWidth={120} width={450}>
                {t('金额')}
              </HeadColumn>
              <HeadColumn minWidth={120} width={450}>
                {t('备注')}
              </HeadColumn>
              {/* {OpColumn.value} */}
              {!props.edit && (
                <HeadColumn minWidth={120} width={450}>
                  {t('操作')}
                </HeadColumn>
              )}
            </>
          ),
          data: slots.default?.(),
        }}
      </Ediatable>
    );
  },
});
