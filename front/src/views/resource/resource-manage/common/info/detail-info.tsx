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

import { defineComponent, PropType } from 'vue';

import InfoList from '../info-list/info-list';

import './detail-info.scss';
import { FieldList } from '../info-list/types';

export default defineComponent({
  components: {
    InfoList,
  },

  props: {
    fields: Array as PropType<FieldList>,
    detail: Object,
    col: { type: Number, default: 2 },
    labelWidth: { type: String, default: () => '120px' },
    globalCopyable: { type: Boolean, default: false },
  },

  emits: ['change'],
  setup(props, { emit }) {
    const handleChange = (val: any) => {
      emit('change', val);
    };

    return {
      handleChange,
      props,
    };
  },

  computed: {
    renderFields() {
      return this.fields.map((field) => {
        return {
          ...field,
          value: field.value || this.detail?.[field?.prop],
        };
      });
    },
  },

  render() {
    return (
      <InfoList
        class='detail-info-main g-scroller'
        fields={this.renderFields}
        onChange={this.handleChange}
        col={this.col}
        labelWidth={this.labelWidth}
        globalCopyable={this.globalCopyable}
      />
    );
  },
});
