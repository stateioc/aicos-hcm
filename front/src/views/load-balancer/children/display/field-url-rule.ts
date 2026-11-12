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

@Model('load-balancer/rule-display')
export class DisplayFieldUrlRule {
  @Column('array', { name: 'VIP 域名' })
  lb_vips: string[];

  @Column('string', { name: '监听器协议' })
  lbl_protocol: string;

  @Column('number', { name: '监听器端口' })
  lbl_port: number;

  @Column('string', { name: 'URL' })
  rule_url: string;

  @Column('array', { name: '监听器域名' })
  rule_domain: string[];

  @Column('number', { name: 'RS数量' })
  target_count: number;
}
