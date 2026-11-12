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
import { VendorEnum, VendorMap } from '@/common/constant';
import { type TaskType, TaskStatus, TaskSource } from '@/views/task/typings';
import { TASK_TYPE_NAME, TASK_SOURCE_NAME, TASK_STATUS_NAME } from '@/views/task/constants';

@Model('task/list.view')
export class ListView {
  @Column('account', { name: '云账号', sort: true })
  account_ids: string[];

  @Column('enum', { name: '云厂商', option: VendorMap, sort: true })
  vendors: VendorEnum[];

  @Column('datetime', { name: '操作时间', sort: true })
  created_at: string;

  @Column('enum', { name: '任务类型', option: TASK_TYPE_NAME, sort: true })
  operations: TaskType;

  @Column('enum', { name: '任务来源', option: TASK_SOURCE_NAME, sort: true })
  source: TaskSource;

  @Column('user', { name: '操作人' })
  creator: string;

  @Column('enum', {
    name: '任务状态',
    option: TASK_STATUS_NAME,
    meta: {
      display: {
        appearance: 'status',
      },
    },
  })
  state: TaskStatus;

  @Column('number', { name: '总数' })
  count_total: number;

  @Column('number', { name: '成功数' })
  count_success: number;

  @Column('number', { name: '失败数' })
  count_failed: number;
}
