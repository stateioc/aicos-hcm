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
import { EditLine } from 'bkui-vue/lib/icon';
import './index.scss';

/**
 * 选中项预览组件
 */
export default defineComponent({
  name: 'SelectedItemPreviewComp',
  props: { content: String, onClick: Function as PropType<() => void> },
  setup(props) {
    return () => (
      <div class='selected-item-preview-comp'>
        <div class='content'>{props.content}</div>
        <EditLine class='edit-btn' onClick={props.onClick} />
      </div>
    );
  },
});
