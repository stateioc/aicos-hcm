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

import { TaskClbType, TaskStatus, TaskSource, TaskDetailStatus } from './typings';

export const TASK_CLB_TYPE_NAME = {
  [TaskClbType.CREATE_L4_LISTENER]: '创建监听器-TCP/UDP',
  [TaskClbType.CREATE_L7_LISTENER]: '创建监听器-HTTP/HTTPS',
  [TaskClbType.CREATE_L7_RULE]: '创建URL规则-HTTP/HTTPS',
  [TaskClbType.DELETE_LISTENER]: '删除监听器-TCP/UDP/HTTP/HTTPS',
  [TaskClbType.BINDING_L4_RS]: '绑定RS-TCP/UDP',
  [TaskClbType.BINDING_L7_RS]: '绑定RS-HTTP/HTTPS',
  [TaskClbType.UNBIND_LAYER4_RS]: '解绑RS-TCP/UDP',
  [TaskClbType.MODIFY_LAYER4_RS_WEIGHT]: '权重调整-TCP/UDP',
  [TaskClbType.MODIFY_LAYER7_RS_WEIGHT]: '权重调整-HTTP/HTTPS',
  [TaskClbType.TARGET_GROUP_MODIFY_WEIGHT]: '权重调整',
  [TaskClbType.TARGET_GROUP_REMOVE_RS]: '解绑RS',
};

export const TASK_TYPE_NAME = {
  ...TASK_CLB_TYPE_NAME,
};

export const TASK_STATUS_NAME = {
  [TaskStatus.RUNNING]: '执行中',
  [TaskStatus.FAILED]: '失败',
  [TaskStatus.SUCCESS]: '成功',
  [TaskStatus.DELIVER_PARTIAL]: '部分成功',
  [TaskStatus.CANCELED]: '已取消',
};

export const TASK_SOURCE_NAME = {
  [TaskSource.SOPS]: '标准运维',
  [TaskSource.EXCEL]: 'Excel导入',
  [TaskSource.API]: '页面操作',
};

export const TASK_DETAIL_STATUS_NAME = {
  [TaskDetailStatus.INIT]: '待执行',
  [TaskDetailStatus.RUNNING]: '运行',
  [TaskDetailStatus.FAILED]: '失败',
  [TaskDetailStatus.SUCCESS]: '成功',
  [TaskDetailStatus.CANCEL]: '取消',
};
