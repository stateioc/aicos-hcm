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

import { Radio } from 'bkui-vue';
// import components
import { defineComponent, onMounted, onUnmounted, reactive, ref, watch } from 'vue';
import CommonDialog from '@/components/common-dialog';
// import hooks
import { useTable } from '@/hooks/useTable/useTable';
// import utils
import bus from '@/common/bus';
// import types
import { type ApplyClbModel } from '@/api/load_balancers/apply-clb/types';
import { QueryRuleOPEnum } from '@/typings';

// apply-clb, 绑定弹性IP弹窗
export default (formModel: ApplyClbModel) => {
  // define data
  const isBindEipDialogShow = ref(false);
  const selectedEipData = reactive({ id: '', name: '', public_ip: '' });
  const eipListSearchRules = reactive([]);

  // use hooks
  const { CommonTable } = useTable({
    searchOptions: {
      disabled: true,
    },
    tableOptions: {
      columns: [
        {
          label: 'ID',
          field: 'cloud_id',
          render: ({ data }: any) => {
            return <Radio v-model={selectedEipData.id} label={data.cloud_id} />;
          },
        },
        {
          label: '名称',
          field: 'name',
        },
        {
          label: '弹性公网IP',
          field: 'public_ip',
        },
      ],
      extra: {
        onRowClick: (_event: Event, _row: any) => {
          Object.assign(selectedEipData, _row);
        },
      },
    },
    requestOption: {
      type: 'eips',
      filterOption: {
        rules: eipListSearchRules,
      },
    },
  });

  // define handler function
  const handleBindEip = () => {
    formModel.cloud_eip_id = selectedEipData.id;
  };

  // 清除绑定的eip
  const handleClearBind = () => {
    Object.assign(selectedEipData, { id: '', name: '', public_ip: '' });
    handleBindEip();
  };

  // define component
  const BindEipDialog = defineComponent({
    setup() {
      return () => (
        <CommonDialog
          v-model:isShow={isBindEipDialogShow.value}
          title='绑定弹性 IP'
          width={620}
          onHandleConfirm={handleBindEip}>
          <div>选择 EIP</div>
          <CommonTable />
        </CommonDialog>
      );
    },
  });

  watch(
    () => formModel.region,
    (newV) => {
      handleClearBind();
      // 当 region 改变时, 重新获取 EIP 列表
      Object.assign(eipListSearchRules, [
        { op: QueryRuleOPEnum.EQ, field: 'account_id', value: formModel.account_id },
        { op: QueryRuleOPEnum.EQ, field: 'region', value: newV },
        { op: QueryRuleOPEnum.NEQ, field: 'recycle_status', value: 'recycling' },
      ]);
    },
  );

  onMounted(() => {
    bus.$on('showBindEipDialog', () => {
      isBindEipDialogShow.value = true;
    });
  });

  onUnmounted(() => {
    bus.$off('showBindEipDialog');
  });

  return {
    BindEipDialog,
  };
};
