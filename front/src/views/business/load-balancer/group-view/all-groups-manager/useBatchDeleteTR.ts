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

import { Ref, computed, ref } from 'vue';
import { useAccountStore, useBusinessStore } from '@/store';
import bus from '@/common/bus';
import { ISearchItem } from 'bkui-vue/lib/search-select/utils';
import { Message } from 'bkui-vue';

export default (searchData: ISearchItem[], selections: Ref<any[]>, getListData: (...args: any) => any) => {
  // use stores
  const accountStore = useAccountStore();
  const businessStore = useBusinessStore();

  const isSubmitLoading = ref(false);
  const isBatchDeleteTargetGroupShow = ref(false);
  const canDeleteTargetGroup = ref(false);
  const batchDeleteTargetGroupTableProps = {
    data: selections.value,
    columns: [
      {
        label: '目标组名称',
        field: 'name',
      },
      {
        label: '协议',
        field: 'protocol',
        filter: true,
        render({ cell }: any) {
          return cell.trim() || '--';
        },
      },
      {
        label: '端口',
        field: 'port',
        filter: true,
      },
      {
        label: '关联的负载均衡',
        field: 'lb_name',
        render({ cell }: any) {
          return cell.trim() || '--';
        },
      },
      {
        label: '绑定监听器数量',
        field: 'listener_num',
        sort: true,
        align: 'right',
      },
    ],
    searchData,
  };

  const computedListenersList = computed(() => {
    if (canDeleteTargetGroup.value) return selections.value.filter(({ listener_num }) => listener_num === 0);
    return selections.value.filter(({ listener_num }) => listener_num > 0);
  });

  // 如果没有可删除的负载均衡, 则禁用删除按钮
  const isSubmitDisabled = computed(
    () => selections.value.filter(({ listener_num }) => listener_num === 0).length === 0,
  );

  // submit-handler
  const batchDeleteTargetGroup = async () => {
    try {
      isSubmitLoading.value = true;
      await businessStore.deleteTargetGroups({
        bk_biz_id: accountStore.bizs,
        // 只删除无绑定监听器的目标组
        ids: selections.value.filter(({ listener_num }) => listener_num === 0).map(({ id }) => id),
      });
      Message({ message: '批量删除成功', theme: 'success' });
      isBatchDeleteTargetGroupShow.value = false;
      // 刷新左侧目标组列表
      bus.$emit('refreshTargetGroupList');
      getListData();
    } finally {
      isSubmitLoading.value = false;
    }
  };

  return {
    isSubmitLoading,
    isBatchDeleteTargetGroupShow,
    canDeleteTargetGroup,
    batchDeleteTargetGroupTableProps,
    batchDeleteTargetGroup,
    computedListenersList,
    isSubmitDisabled,
  };
};
