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

import { defineComponent, ref, watch } from 'vue';
// import {
//   useI18n,
// } from 'vue-i18n';
import { useAccountStore } from '@/store';
import { useResourceStore } from '@/store/resource';
import StepDialog from '@/components/step-dialog/step-dialog';
import './resource-business.scss';

export default defineComponent({
  components: {
    StepDialog,
  },

  props: {
    title: {
      type: String,
    },
    isShow: {
      type: Boolean,
    },
    type: {
      type: String,
    },
    list: {
      type: Array,
    },
  },

  emits: ['update:isShow', 'handle-confirm'],

  setup(props, { emit }) {
    const business = ref('');
    const businessList = ref([]);
    const accountStore = useAccountStore();
    const resourceStore = useResourceStore();

    // use hooks
    // const {
    //   t,
    // } = useI18n();

    watch(
      () => props.isShow,
      (val) => {
        if (val) {
          getBusinessList();
        }
      },
    );

    // 状态
    const steps = [
      {
        component: () => (
          <>
            <bk-select v-model={business.value} class='business-select' filterable>
              {businessList.value.map((item, index) => (
                <>
                  <bk-option key={index} value={item.id} label={item.name} />
                </>
              ))}
            </bk-select>
            {/* {
            `${t('共转移') + business.value.length + t('个')}`
          } */}
          </>
        ),
      },
    ];

    const handleClose = () => {
      emit('update:isShow', false);
    };

    const handleConfirm = () => {
      resourceStore
        .assignBusiness(props.type, {
          bk_biz_id: business.value,
          ids: props.list.map((item: any) => item.id),
        })
        .then(() => {
          emit('handle-confirm', business.value);
          handleClose();
        });
    };

    const getBusinessList = async () => {
      try {
        const res = await accountStore.getBizList();
        console.log(res);
        businessList.value = res?.data;
      } catch (error) {
        console.log(error);
      }
    };

    return {
      steps,
      handleClose,
      handleConfirm,
    };
  },

  render() {
    return (
      <>
        <step-dialog
          size='normal'
          dialogWidth='500'
          title={this.title}
          isShow={this.isShow}
          steps={this.steps}
          onConfirm={this.handleConfirm}
          onCancel={this.handleClose}></step-dialog>
      </>
    );
  },
});
