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

import { ModelPropertyDisplay } from '@/model/typings';
import { VendorMap } from '@/common/constant';

export const properties: ModelPropertyDisplay[] = [
  {
    id: 'account_id',
    name: '云账号',
    type: 'account',
  },
  {
    id: 'vendor',
    name: '云厂商',
    type: 'enum',
    option: VendorMap,
  },
  {
    id: 'created_at',
    name: '操作时间',
    type: 'datetime',
  },
  {
    id: 'res_type',
    name: '资源类型',
    type: 'string',
  },
  {
    id: 'res_id',
    name: '实例ID',
    type: 'string',
  },
  {
    id: 'cloud_res_id',
    name: '云资源ID',
    type: 'string',
  },
  {
    id: 'res_name',
    name: '资源名称',
    type: 'string',
  },
  {
    id: 'source',
    name: '操作来源',
    type: 'string',
  },
  {
    id: 'action',
    name: '操作方式',
    type: 'string',
  },
  {
    id: 'bk_biz_id',
    name: '所属业务',
    type: 'business',
  },
  {
    id: 'operator',
    name: '操作人',
    type: 'user',
  },
  {
    id: 'rid',
    name: '请求ID',
    type: 'string',
  },
];
