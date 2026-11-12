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

import { PropType, defineComponent } from 'vue';
import { Dialog } from 'bkui-vue';
import { useI18n } from 'vue-i18n';
import './index.scss';

export default defineComponent({
  name: 'CommonDialog',
  props: {
    isShow: {
      type: Boolean,
      default: false,
    },
    title: String,
    width: [String, Number],
    dialogType: String as PropType<'show' | 'operation' | 'confirm' | 'process'>,
  },
  emits: ['update:isShow', 'handleConfirm'],
  setup(props, { emit, slots }) {
    const { t } = useI18n();
    const triggerShow = (isShow: boolean) => {
      emit('update:isShow', isShow);
    };
    const handleConfirm = () => {
      if (props.dialogType !== 'operation') emit('update:isShow', false);
      emit('handleConfirm');
    };
    return () => (
      <Dialog
        class='common-dialog'
        isShow={props.isShow}
        title={t(props.title)}
        width={props.width}
        dialogType={props.dialogType}
        onConfirm={handleConfirm}
        onClosed={() => triggerShow(false)}>
        {{
          default: () => slots.default?.(),
          tools: () => slots.tools?.(),
          footer: slots.footer ? () => slots.footer?.() : undefined,
        }}
      </Dialog>
    );
  },
});
