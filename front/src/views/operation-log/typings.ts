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

import { OPERATION_LOG_RESOURCE_TYPE, OPERATION_LOG_ACTION, OPERATION_LOG_SOURCE } from './constants';

export type OperationLogResourceType = (typeof OPERATION_LOG_RESOURCE_TYPE)[keyof typeof OPERATION_LOG_RESOURCE_TYPE];

export type OperationLogAction = (typeof OPERATION_LOG_ACTION)[keyof typeof OPERATION_LOG_ACTION];

export type OperationLogSource = (typeof OPERATION_LOG_SOURCE)[keyof typeof OPERATION_LOG_SOURCE];

export interface ISearchCondition {
  [key: string]: any;
}
