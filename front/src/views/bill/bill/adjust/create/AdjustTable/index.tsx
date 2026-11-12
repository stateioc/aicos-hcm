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

import { PropType, defineComponent, inject, ref, watch } from 'vue';
import './index.scss';
import RenderTable from '../RenderTable';
import RenderTableRow from '../RenderTableRow';
import { AdjustmentItem } from '@/typings/bill';
import { VendorEnum } from '@/common/constant';
import { AdjustTypeEnum } from '../RenderTableRow/components/AdjustTypeSelector';
import { cloneDeep } from 'lodash-es';

export default defineComponent({
  props: {
    edit: {
      default: false,
      type: Boolean,
    },
    editData: {
      default: [],
      type: Object,
    },
    vendor: {
      required: true,
      type: String as PropType<VendorEnum>,
    },
    rootAccountId: {
      required: true,
      type: String,
    },
  },
  setup(props, { expose }) {
    const Record = (): Partial<AdjustmentItem> => {
      return {
        product_id: '',
        bk_biz_id: '',
        type: AdjustTypeEnum.Increase,
        cost: '',
        main_account_id: '',
        memo: '',
      };
    };
    const rowRefs = [ref(null)];
    const tableData = ref([props.edit ? props.editData : Record()]);
    const setCostSum = inject<Function>('adjust_bill_set_costSum');

    watch(
      () => tableData.value,
      (arr) => {
        let increaseSum = 0;
        let decreaseSum = 0;
        for (const { cost, type } of arr) {
          if (type === AdjustTypeEnum.Increase) increaseSum += +cost;
          else decreaseSum += +cost;
        }
        setCostSum(increaseSum, decreaseSum);
      },
      {
        deep: true,
      },
    );

    watch(
      [() => props.edit, () => props.editData],
      ([isEdit, data]) => {
        tableData.value = [isEdit ? data : Record()];
        rowRefs.map((rowRef) => rowRef.value?.reset());
      },
      {
        immediate: true,
        deep: true,
      },
    );

    expose({
      getValue: async () => {
        return await Promise.all(rowRefs.map((row) => row.value.getValue()));
      },
      reset: () => {
        tableData.value = [Record()];
        rowRefs.map((rowRef) => rowRef.value?.reset());
      },
    });

    return () => (
      <div class={'adjust-table-container'}>
        <RenderTable edit={props.edit}>
          {tableData.value.map((item, idx) => (
            <RenderTableRow
              edit={props.edit}
              editData={item}
              vendor={props.vendor}
              rootAccountId={props.rootAccountId}
              onAdd={() => {
                tableData.value.push(Record());
                rowRefs.push(ref());
              }}
              onRemove={() => {
                tableData.value.splice(idx, 1);
                rowRefs.splice(idx, 1);
              }}
              onCopy={() => {
                tableData.value.push(cloneDeep(tableData.value[idx]));
                rowRefs.push(ref());
              }}
              onChange={(val) => {
                tableData.value[idx] = val;
              }}
              removeable={tableData.value.length < 2}
              ref={rowRefs[idx]}
            />
          ))}
        </RenderTable>
      </div>
    );
  },
});
