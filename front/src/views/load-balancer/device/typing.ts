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

import { VendorEnum } from '@/common/constant';

export enum DeviceTabEnum {
  LISTENER = 'listener',
  URL = 'url',
  RS = 'rs',
}

export interface ICount {
  listenerCount: number;
  urlCount: number;
  rsCount: number;
  [key: string]: number;
}

// 条件类型
export interface ILoadBalanceDeviceCondition {
  vendor: VendorEnum;
  account_id: string;
  lb_regions?: string[];
  lb_network_types?: string[];
  lb_ip_versions?: string[];
  cloud_lb_ids?: string[];
  lb_vips?: string[];
  lb_domains?: string[];
  lbl_protocols?: string[];
  lbl_ports?: number[];
  rule_domains?: string[];
  rule_urls?: string[];
  target_ips?: string[];
  target_ports?: number[];
  [key: string]: any;
}

export interface IDeviceListDataLoadedEvent {
  'list-data-loaded': [
    from: DeviceTabEnum,
    payload: { type: 'listenerCount' | 'urlCount' | 'rsCount'; data: Record<string, any> },
  ];
}
