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
import { useI18n } from 'vue-i18n';
import StepDialog from '@/components/step-dialog/step-dialog';
import './host-refund.scss';

export default defineComponent({
  components: {
    StepDialog,
  },

  props: {
    isShow: {
      type: Boolean,
    },
    title: {
      type: String,
    },
  },

  emits: ['update:isShow'],

  setup(_, { emit }) {
    const tableData = ref([]);
    const columns: any[] = [{ label: '23' }];

    // use hooks
    const { t } = useI18n();

    // 状态
    const refundSetting = ref([]);
    const steps = [
      {
        title: t('选项'),
        component: () => (
          <>
            <bk-checkbox-group v-model={refundSetting.value}>
              <bk-checkbox class='single-checkbox' label='withIp'>
                {t('同时退还挂载在实例上的包年包月弹性数据盘')}
              </bk-checkbox>
              <bk-checkbox class='single-checkbox' label='inRecycle'>
                {t('退还后实例将在回收站保留，具体保留天数由第三方云确定')}
              </bk-checkbox>
            </bk-checkbox-group>
          </>
        ),
      },
      {
        title: t('信息确认'),
        component: () => (
          <>
            <h3 class='refund-head'>{t('本次将退还资源如下')}：</h3>
            <span>{t('{count}台主机', { count: 4 })}</span>
            <bk-table class='mt5' row-hover='auto' columns={columns} data={tableData.value} show-overflow-tooltip />
            <span>{t('{count}个云硬盘', { count: 4 })}</span>
            <bk-table class='mt5' row-hover='auto' columns={columns} data={tableData.value} show-overflow-tooltip />
            <span>{t('{count}个弹性IP', { count: 4 })}</span>
            <bk-table class='mt5' row-hover='auto' columns={columns} data={tableData.value} show-overflow-tooltip />
            <h3 class='refund-head'>{t('本次将保留资源如下')}：</h3>
            <span>{t('{count}个块存储', { count: 4 })}</span>
            <bk-table class='mt5' row-hover='auto' columns={columns} data={tableData.value} show-overflow-tooltip />
          </>
        ),
      },
    ];

    const handleClose = () => {
      emit('update:isShow', false);
    };

    const handleConfirm = () => {
      handleClose();
    };

    return {
      steps,
      t,
      handleClose,
      handleConfirm,
    };
  },

  render() {
    return (
      <>
        <step-dialog
          title={this.title}
          isShow={this.isShow}
          steps={this.steps}
          onConfirm={this.handleConfirm}
          onCancel={this.handleClose}></step-dialog>
      </>
    );
  },
});
