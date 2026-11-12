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
import { SCHEDULER_NAME } from '../../constants';

@Model('load-balancer/rule-display')
export class DisplayFieldRule {
  @Column('string', { name: '域名' })
  domain: string;

  @Column('string', { name: 'URL路径' })
  url: string[];

  @Column('enum', { name: '均衡方式', option: SCHEDULER_NAME })
  scheduler: string;

  @Column('string', { name: '目标组' })
  target_group_id: string;

  @Column('number', { name: 'RS数量' })
  rs_num: number;

  @Column('string', { name: '同步状态' })
  binding_status: string;
}
