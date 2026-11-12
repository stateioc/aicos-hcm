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

import { PropType, defineComponent, ref } from 'vue';
import StepDialog from '@/components/step-dialog/step-dialog';
import './add-rule.scss';
import { VendorEnum } from '@/common/constant';
import AddRuleTable from '../../components/security/add-rule/AddRuleTable';

export type SecurityRule = {
  name: string;
  priority: number;
  ethertype: string;
  sourceAddress: string;
  source_port_range: string;
  targetAddress: string;
  protocol: string;
  destination_port_range: string;
  port: number | string;
  access: string;
  action: string;
  memo: string;
  cloud_service_id: string;
  cloud_service_group_id: string;
};

export enum IP_CIDR {
  IPV4_ALL = '0.0.0.0/0',
  IPV6_ALL = '::/0',
}

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
    vendor: {
      type: String,
    },
    loading: {
      type: Boolean,
    },
    dialogWidth: {
      type: String,
    },
    activeType: {
      type: String as PropType<'ingress' | 'egress'>,
    },
    relatedSecurityGroups: {
      type: Array as PropType<any>,
    },
    isEdit: {
      type: Boolean as PropType<boolean>,
    },
    templateData: {
      type: Object as PropType<{ ipList: Array<string>; ipGroupList: Array<string> }>,
    },
    id: String,
  },

  emits: ['update:isShow', 'submit'],

  setup(props, { emit }) {
    const instance = ref();
    const isSubmitLoading = ref(false);
    const steps = [
      {
        component: () => (
          <div style={{ maxHeight: 'calc(100vh - 300px)', overflowY: 'auto' }}>
            <AddRuleTable
              style={{ marginBottom: 0 }}
              ref={instance}
              vendor={props.vendor as VendorEnum}
              templateData={props.templateData}
              relatedSecurityGroups={props.relatedSecurityGroups}
              id={props.id}
              activeType={props.activeType}
              isEdit={props.isEdit}
            />
          </div>
        ),
      },
    ];

    const handleClose = () => {
      emit('update:isShow', false);
    };

    const handleConfirm = async () => {
      isSubmitLoading.value = true;
      try {
        await instance.value.handleSubmit();
        emit('submit');
        emit('update:isShow', false);
      } finally {
        isSubmitLoading.value = false;
      }
    };

    return {
      steps,
      handleClose,
      handleConfirm,
      isSubmitLoading,
    };
  },

  render() {
    return (
      <>
        <step-dialog
          renderType={'if'}
          dialogWidth={this.dialogWidth}
          title={this.title}
          loading={this.isSubmitLoading}
          isShow={this.isShow}
          steps={this.steps}
          onConfirm={this.handleConfirm}
          onCancel={this.handleClose}></step-dialog>
      </>
    );
  },
});
