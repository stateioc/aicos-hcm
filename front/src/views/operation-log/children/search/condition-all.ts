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

/* eslint-disable @typescript-eslint/no-unused-vars */
import { Model, Column } from '@/decorator';
import { QueryRuleOPEnum } from '@/typings';
import {
  CLB_RES_TYPES,
  OPERATION_LOG_ACTION_NAME,
  OPERATION_LOG_RESOURCE_TYPE,
  OPERATION_LOG_RESOURCE_TYPE_NAME,
} from '@/views/operation-log/constants';
import type { OperationLogAction, OperationLogResourceType } from '@/views/operation-log/typings';
import { SearchCondition } from './condition';

@Model('operation-log/search-condition-all')
export class SearchConditionAll extends SearchCondition {
  @Column('enum', {
    name: '资源类型',
    option: OPERATION_LOG_RESOURCE_TYPE_NAME,
    index: 1,
    meta: {
      search: {
        filterRules(value: any) {
          const val = value === OPERATION_LOG_RESOURCE_TYPE.CLB ? CLB_RES_TYPES : [value];
          return {
            field: 'res_type',
            op: QueryRuleOPEnum.IN,
            value: val,
          };
        },
      },
    },
  })
  res_type: OperationLogResourceType;

  @Column('enum', { name: '操作方式', option: OPERATION_LOG_ACTION_NAME, index: 2 })
  action: OperationLogAction;
}
