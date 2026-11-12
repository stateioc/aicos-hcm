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

import { VendorMap } from '@/common/constant';
import { ModelProperty } from '@/model/typings';

export default [
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
] as ModelProperty[];
