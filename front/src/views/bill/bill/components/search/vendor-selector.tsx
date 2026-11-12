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

import { VendorEnum } from '@/common/constant';
import { Select } from 'bkui-vue';
import { PropType, defineComponent, ref, watch } from 'vue';
import { useI18n } from 'vue-i18n';

export default defineComponent({
  props: { modelValue: String as PropType<VendorEnum> },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const { t } = useI18n();
    const selectedValue = ref(props.modelValue);

    const list = ref([
      { id: VendorEnum.AWS, name: t('亚马逊云') },
      { id: VendorEnum.AZURE, name: t('微软云') },
      { id: VendorEnum.GCP, name: t('谷歌云') },
      { id: VendorEnum.HUAWEI, name: t('华为云') },
      { id: VendorEnum.ZENLAYER, name: t('zenlayer') },
    ]);

    watch(
      () => props.modelValue,
      (val) => (selectedValue.value = val),
      { deep: true },
    );

    watch(selectedValue, (val) => emit('update:modelValue', val), { deep: true });

    return () => (
      <Select v-model={selectedValue.value} multiple multipleMode='tag' collapseTags clearable>
        {list.value.map(({ id, name }) => (
          <Select.Option key={id} id={id} name={name} />
        ))}
      </Select>
    );
  },
});
