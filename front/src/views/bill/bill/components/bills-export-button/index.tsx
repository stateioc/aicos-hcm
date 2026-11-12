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

import { defineComponent, PropType, ref } from 'vue';

import { Button } from 'bkui-vue';

import { useI18n } from 'vue-i18n';

/**
 * 导出按钮
 * @prop {Function} cb - 获取下载链接的回调函数
 * @prop {String} title - 弹窗标题
 * @prop {String} content - 弹窗内容
 */
export default defineComponent({
  props: { cb: Function as PropType<() => Promise<void>>, title: String, content: String },
  setup(props) {
    const { t } = useI18n();

    const isLoading = ref(false);

    const handleExport = async () => {
      isLoading.value = true;
      try {
        await props.cb();
      } finally {
        isLoading.value = false;
      }
    };

    return () => (
      <>
        <Button
          onClick={handleExport}
          loading={isLoading.value}
          v-bk-tooltips={{
            content: t('单次导出最多20万条账单，超出条数后，当前暂不支持导出。'),
            placement: 'top-start',
          }}>
          {t('导出')}
        </Button>
      </>
    );
  },
});
