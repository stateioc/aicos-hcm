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
import { OPERATION_LOG_ACTION, OPERATION_LOG_ACTION_NAME } from '@/views/operation-log/constants';
import type { OperationLogAction, OperationLogResourceType } from '@/views/operation-log/typings';
import { SearchCondition } from './condition';

@Model('operation-log/search-condition-security-group')
export class SearchConditionSecurityGroup extends SearchCondition {
  static actionOption = {
    [OPERATION_LOG_ACTION.CREATE]: OPERATION_LOG_ACTION_NAME[OPERATION_LOG_ACTION.CREATE],
    [OPERATION_LOG_ACTION.UPDATE]: OPERATION_LOG_ACTION_NAME[OPERATION_LOG_ACTION.UPDATE],
    [OPERATION_LOG_ACTION.DELETE]: OPERATION_LOG_ACTION_NAME[OPERATION_LOG_ACTION.DELETE],
  };

  @Column('enum', { name: '操作方式', option: SearchConditionSecurityGroup.actionOption, index: 1 })
  action: OperationLogAction;

  @Column('enum', { apiOnly: true })
  res_type: OperationLogResourceType;
}
