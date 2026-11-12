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

import { Column, Model } from '@/decorator';
import { LISTENER_PROTOCOL_NAME } from '../../constants';
import { QueryRuleOPEnum } from '@/typings';
import { buildFilterRulesWithSearchSelect } from '@/utils/search';
import { toArray } from '@/common/util';

@Model('load-balancer/listener-condition')
export class SearchConditionListener {
  @Column('string', { name: '监听器ID' })
  id: string;

  @Column('string', { name: '监听器ID' })
  cloud_id: string;

  @Column('string', {
    name: '监听器名称',
    meta: {
      search: {
        filterRules(value) {
          return buildFilterRulesWithSearchSelect(value, 'name', QueryRuleOPEnum.CS);
        },
      },
    },
  })
  name: string;

  @Column('enum', { name: '协议', option: LISTENER_PROTOCOL_NAME })
  protocol: string;

  @Column('array', {
    name: '端口',
    format: (value) => {
      const values = toArray(value).map((val: string) => Number(val));
      return values.filter((val: number) => !isNaN(val));
    },
  })
  port: number[];
}
