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

import http from '@/http';
import { Loading, Table } from 'bkui-vue';
import { PropType, defineComponent, onMounted, ref } from 'vue';
import './index.scss';
import { RESOURCE_TYPES_MAP, VendorEnum } from '@/common/constant';
const { BK_HCM_AJAX_URL_PREFIX } = window.PROJECT_CONFIG;

export default defineComponent({
  props: {
    secretIds: {
      type: Object as PropType<Record<string, string>>,
      required: true,
    },
    vendor: {
      type: String as PropType<VendorEnum>,
      required: true,
    },
  },
  setup(props) {
    const isLoading = ref(false);
    const tableData = ref([]);
    const columns = [
      {
        label: '资源名称',
        field: 'type',
        render: ({ cell }: { cell: string }) => RESOURCE_TYPES_MAP[cell],
      },
      {
        label: '插件类型',
        render: () => '系统内置',
      },
      // 下期再展示操作列
      // {
      //   label: '操作',
      //   field: 'opertaion',
      //   rendor: ({ data }: any) => data.operation.join(','),
      // },
      {
        label: '资源数量',
        field: 'count',
      },
      {
        label: '同步周期',
        render: () => (
          <>
            {/* <Switcher disabled class={'mr8'}/> */}
            20分钟
          </>
        ),
      },
    ];
    onMounted(async () => {
      isLoading.value = true;
      const res = await http.post(
        `${BK_HCM_AJAX_URL_PREFIX}/api/v1/cloud/vendors/${props.vendor}/accounts/res_counts/by_secrets`,
        props.secretIds,
      );
      tableData.value = res.data.items;
      isLoading.value = false;
    });
    return () => (
      <div class={'account-resource-container'}>
        <Loading loading={isLoading.value}>
          <Table
            data={tableData.value}
            columns={columns}
            border={['row', 'outer']}
            emptyText={isLoading.value && ''}></Table>
        </Loading>
      </div>
    );
  },
});
