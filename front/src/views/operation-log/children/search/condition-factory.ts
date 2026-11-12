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

import { ResourceTypeEnum } from '@/common/resource-constant';
import { getModel } from '@/model/manager';
import { SearchConditionAll } from './condition-all';
import { SearchConditionSecurityGroup } from './condition-security-group';
import { SearchConditionClb } from './condition-clb';

export class SearchConditionFactory {
  static createModel(resourceType: ResourceTypeEnum | 'all') {
    switch (resourceType) {
      case ResourceTypeEnum.CLB:
        return getModel(SearchConditionClb);
      case 'all':
        return getModel(SearchConditionAll);
      default:
        return getModel(SearchConditionSecurityGroup); // 除了CLB 与 全部，其余搜索列暂时跟安全组一样
    }
  }
}
