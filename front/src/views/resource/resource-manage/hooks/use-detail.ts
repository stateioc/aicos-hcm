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

import { onBeforeMount, ref } from 'vue';
import { VendorMap } from '@/common/constant';
import { useResourceStore } from '@/store/resource';
import { useBusinessMapStore } from '@/store/useBusinessMap';

export default (type: string, id: string, cb?: Function, vendor?: string) => {
  const loading = ref(false);
  const detail = ref<any>({});
  const resourceStore = useResourceStore();
  const { getNameFromBusinessMap } = useBusinessMapStore();

  // 从接口获取数据，并拼装需要的信息
  const getDetail = async () => {
    loading.value = true;
    resourceStore
      .detail(type, id, vendor)
      .then(async ({ data = {} }: { data: any }) => {
        detail.value = {
          ...data,
          ...data.extension,
          vendorName: VendorMap[data.vendor],
          bk_biz_id_label: data.bk_biz_id === -1 ? '未分配' : data.bk_biz_id,
          bk_biz_id_name: '',
        };
        detail.value.bk_biz_id_name = await getNameFromBusinessMap(data.bk_biz_id);
        cb?.(detail.value);
        resourceStore.setVendorOfCurrentResource(data.vendor);
      })
      .finally(() => {
        loading.value = false;
      });
  };

  onBeforeMount(getDetail);

  return {
    loading,
    detail,
    getDetail,
  };
};
