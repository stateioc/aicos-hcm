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

import { cloneDeep, isArray } from 'lodash';
import {
  AzureSecurityGroupRule,
  AzureSourceAddressType,
  AzureSourceTypeArr,
  AzureTargetAddressType,
  AzureTargetTypeArr,
} from '.';

export const AZURE_PROTOCOL_ALL = '*';
export const AZURE_PROTOCOL_ICMP = 'Icmp';
export const AZURE_PORT_ALL = '*';

export const azureHandler = (data: AzureSecurityGroupRule & { port: string }): AzureSecurityGroupRule => {
  delete data.key;
  if ([AZURE_PROTOCOL_ALL, AZURE_PROTOCOL_ICMP].includes(data.protocol)) data.port = AZURE_PORT_ALL;
  if (data.destination_port_range === 'ALL') data.destination_port_range = AZURE_PORT_ALL;
  return data;
};

export const azurePreHandler = (
  data: AzureSecurityGroupRule & { sourceAddress: AzureSourceAddressType; targetAddress: AzureTargetAddressType },
) => {
  const res: any = cloneDeep(data);
  AzureSourceTypeArr.forEach((type) => res[type] && (res.sourceAddress = type));
  AzureTargetTypeArr.forEach((type) => res[type] && (res.targetAddress = type));
  if (res.destination_port_range === AZURE_PORT_ALL) res.destination_port_range = 'ALL';
  return res;
};
