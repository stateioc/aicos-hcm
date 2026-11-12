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

import { PropType, defineComponent, onMounted, ref } from 'vue';
import cssModule from './index.module.scss';
import { useI18n } from 'vue-i18n';
import { BillsSummarySum, BillsSummarySumResData, CostMap } from '@/typings/bill';
import { Loading } from 'bkui-vue';
import { formatBillCost } from '@/utils';

export default defineComponent({
  props: {
    isAdjust: Boolean,
    onlyRMB: Boolean,
    showType: {
      type: String as PropType<'vertical' | 'horizontal'>,
      default: 'horizontal',
    },
    api: Function as PropType<(...args: any) => Promise<BillsSummarySumResData>>,
    payload: Function as PropType<() => object>,
    immediate: Boolean,
    data: Object as PropType<CostMap>,
  },
  setup(props, { expose }) {
    const { t } = useI18n();
    const amountInfo = ref<BillsSummarySum>();
    const isLoading = ref(false);

    const getAmountInfo = async () => {
      isLoading.value = true;
      try {
        const res = await props.api(props.payload());
        amountInfo.value = res.data;
      } finally {
        isLoading.value = false;
      }
    };
    const getMoney = (cash = 'CNY', key = 'Cost') => {
      const val = props.data?.[cash]?.[key] || amountInfo.value?.cost_map?.[cash]?.[key];
      return val ?? '0';
    };

    onMounted(() => {
      props.api && props.payload && props.immediate && getAmountInfo();
    });

    expose({ refreshAmountInfo: getAmountInfo });

    return () => (
      <div
        class={{
          [cssModule['amount-wrapper']]: true,
          [cssModule.vertical]: props.showType === 'vertical',
        }}>
        {!props.onlyRMB ? (
          <span class={cssModule.item}>
            {t('人民币+美金（合人民币）')}：
            <Loading loading={isLoading.value} opacity={1} style={{ minWidth: '80px' }} size='small'>
              <span class={cssModule.money}>
                {`￥${formatBillCost(String(Number(getMoney('CNY', 'RMBCost')) + Number(getMoney('USD', 'RMBCost'))))}`}
              </span>
            </Loading>
          </span>
        ) : null}

        {!props.onlyRMB ? (
          <span class={cssModule.item}>
            {t('共计')}
            {props.isAdjust ? t('增加') : t('人民币')}：
            <Loading loading={isLoading.value} opacity={1} style={{ minWidth: '80px' }} size='small'>
              <span class={cssModule.money}>
                {props.isAdjust
                  ? `￥ ${formatBillCost(amountInfo.value?.cost_map?.increase.RMB?.Cost)}  |  $ ${formatBillCost(
                      amountInfo.value?.cost_map?.increase.USD?.Cost,
                    )} `
                  : `￥${formatBillCost(getMoney())}`}
              </span>
            </Loading>
          </span>
        ) : null}

        {!props.onlyRMB ? (
          <span class={cssModule.item}>
            {t('共计')}
            {props.isAdjust ? t('减少') : t('美金')}：
            <Loading loading={isLoading.value} opacity={1} style={{ minWidth: '80px' }} size='small'>
              <span class={cssModule.money}>
                {props.isAdjust
                  ? `￥ ${formatBillCost(amountInfo.value?.cost_map?.decrease.RMB?.Cost)}  |  $ ${formatBillCost(
                      amountInfo.value?.cost_map?.decrease.USD?.Cost,
                    )} `
                  : `＄${formatBillCost(getMoney('USD'))}`}
              </span>
            </Loading>
          </span>
        ) : null}

        {props.onlyRMB && (
          <span class={cssModule.item}>
            {t('共计')}
            {t('人民币')}：
            <Loading loading={isLoading.value} opacity={1} style={{ minWidth: '80px' }} size='small'>
              <span class={cssModule.money}>
                {`￥${formatBillCost(String(Number(getMoney('CNY', 'RMBCost')) + Number(getMoney('USD', 'RMBCost'))))}`}
              </span>
            </Loading>
          </span>
        )}
      </div>
    );
  },
});
