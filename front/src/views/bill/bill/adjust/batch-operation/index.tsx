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

import { PropType, computed, defineComponent, reactive, ref } from 'vue';

import { Alert } from 'bkui-vue';
import BatchOperationDialog from '@/components/batch-operation-dialog';

import { useI18n } from 'vue-i18n';
import { confirmBillsAdjustment, deleteBillsAdjustment } from '@/api/bill';
import { VendorMap } from '@/common/constant';
import { RulesItem } from '@/typings';

export default defineComponent({
  props: {
    action: String as PropType<'confirm' | 'delete'>,
    getListData: Function as PropType<(customRules?: RulesItem[], type?: string) => Promise<void>>,
    resetSelections: Function as PropType<() => void>,
  },
  setup(props, { expose }) {
    const { t } = useI18n();
    const isBatchOperationDialogShow = ref(false);
    const isSubmitLoading = ref(false);

    const actionInfo = computed(() => ({
      title: props.action === 'delete' ? t('批量删除调账明细') : t('批量确认调账明细'),
      tips:
        props.action === 'confirm' ? () => <Alert>{t('确认调账信息后，调账数据将在二级账号上生效')}</Alert> : undefined,
      confirmCb: handleBatchOperationConfirm,
    }));

    // 批量操作
    const tableProps = reactive({
      columns: [
        { label: t('云厂商'), field: 'vendor', render: ({ cell }: any) => VendorMap[cell] },
        { label: t('一级账号ID'), field: 'root_account_id' },
        { label: t('二级账号ID'), field: 'main_account_id' },
        { label: t('核算月份'), field: 'bill_month' },
        { label: t('人民币（元）'), field: 'rmb_cost' },
        { label: t('美金（美元）'), field: 'cost' },
      ],
      data: [],
      searchData: [
        { name: t('云厂商'), id: 'vendor' },
        { name: t('一级账号ID'), id: 'root_account_id' },
        { name: t('二级账号ID'), id: 'main_account_id' },
        { name: t('核算月份'), id: 'bill_month' },
        { name: t('人民币（元）'), id: 'rmb_cost' },
        { name: t('美金（美元）'), id: 'cost' },
      ],
    });

    const handleBatchOperationConfirm = async () => {
      const api = props.action === 'delete' ? deleteBillsAdjustment : confirmBillsAdjustment;
      isSubmitLoading.value = true;
      try {
        await api(tableProps.data.map((item: any) => item.id));
        props.getListData();
        props.resetSelections();
        isBatchOperationDialogShow.value = false;
      } finally {
        isSubmitLoading.value = false;
      }
    };

    const triggerShow = (v: boolean) => {
      isBatchOperationDialogShow.value = v;
    };

    const changeData = (data: any) => {
      tableProps.data = data;
    };

    expose({ triggerShow, changeData });

    return () => (
      <BatchOperationDialog
        v-model:isShow={isBatchOperationDialogShow.value}
        title={actionInfo.value.title}
        tableProps={tableProps}
        list={tableProps.data}
        onHandleConfirm={actionInfo.value.confirmCb}>
        {{
          tips: actionInfo.value.tips,
        }}
      </BatchOperationDialog>
    );
  },
});
