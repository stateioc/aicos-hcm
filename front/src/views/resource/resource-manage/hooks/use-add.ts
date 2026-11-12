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

import {
  // onMounted,
  ref,
} from 'vue';

import { useResourceStore } from '@/store/resource';

import { Message } from 'bkui-vue';
import i18n from '@/language/i18n';

// import { useI18n } from 'vue-i18n';

export default (type: string, data: any, id?: number) => {
  const { t } = i18n.global;
  const loading = ref(false);
  const resourceStore = useResourceStore();

  // 新增
  const addData = async () => {
    loading.value = true;
    try {
      await resourceStore.add(type, data);
      Message({
        message: t('添加成功'),
        theme: 'success',
      });
    } catch (error) {
      console.log(error);
    } finally {
      loading.value = false;
    }
  };

  // 更新
  const updateData = async () => {
    loading.value = true;
    try {
      await resourceStore.update(type, data, id);
      Message({
        message: t('编辑成功'),
        theme: 'success',
      });
    } catch (error) {
      console.log(error);
    } finally {
      loading.value = false;
    }

    // resourceStore
    //   .update(type, data, id)
    //   .then(() => {

    //   })
    //   .finally(() => {
    //     loading.value = false;
    //   });
  };

  // onMounted(addData);

  return {
    loading,
    addData,
    updateData,
  };
};
