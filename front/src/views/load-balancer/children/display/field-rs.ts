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
import { RsInstType } from '../../constants';

@Model('load-balancer/rs-display')
export class DisplayFieldRs {
  @Column('array', { name: '内网IP', index: 0, width: 130 })
  private_ip_address: string[];

  @Column('array', { name: '公网IP', index: 0, width: 130 })
  public_ip_address: string[];

  @Column('string', { name: '名称', index: 0, width: 120 })
  inst_name: string;

  @Column('string', { name: '可用区', index: 0, width: 120 })
  zone: string;

  @Column('enum', { name: '资源类型', index: 0, option: RsInstType, width: 100 })
  inst_type: string;

  @Column('array', { name: '所属VPC', index: 0, width: 120 })
  cloud_vpc_ids: string[];

  @Column('number', { name: '端口', index: 0, width: 80, fixed: 'right' })
  port: number;

  @Column('number', { name: '权重', index: 0, width: 100, fixed: 'right' })
  weight: number;
}
