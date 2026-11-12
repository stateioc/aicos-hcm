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

import { defineComponent } from 'vue';
// import custom hooks
import useRenderTable from './hooks/useRenderTable';
import useRenderForm from './hooks/useRenderForm';
import './index.scss';

export default defineComponent({
  setup() {
    // use custom hooks
    const { CommonTable, getListData } = useRenderTable();
    const { RenderForm } = useRenderForm(getListData);

    return () => (
      <div class='user-list-module'>
        <CommonTable></CommonTable>
        <RenderForm></RenderForm>
      </div>
    );
  },
});
