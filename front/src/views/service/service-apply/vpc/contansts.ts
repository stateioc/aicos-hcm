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

import { VendorEnum } from "@/common/constant";

export const IP_RANGES: any = {
  [VendorEnum.TCLOUD]: [
    {
      ip: '10.0.0.0',
      mask: 8,
      minMask: 12,
      maxMask: 28,
    },
    {
      ip: '172.16.0.0',
      mask: 12,
      minMask: 12,
      maxMask: 28,
    },
    {
      ip: '192.168.0.0',
      mask: 16,
      minMask: 16,
      maxMask: 28,
    },
  ],
  // AWS\AZURE\GCP相同
  [VendorEnum.AWS]: [
    {
      ip: '10.0.0.0',
      mask: 8,
      minMask: 16,
      maxMask: 28,
    },
    {
      ip: '172.16.0.0',
      mask: 12,
      minMask: 12,
      maxMask: 28,
    },
    {
      ip: '192.168.0.0',
      mask: 16,
      minMask: 16,
      maxMask: 28,
    },
  ],
  [VendorEnum.AZURE]: [
    {
      ip: '10.0.0.0',
      mask: 8,
      minMask: 16,
      maxMask: 28,
    },
    {
      ip: '172.16.0.0',
      mask: 12,
      minMask: 16,
      maxMask: 28,
    },
    {
      ip: '192.168.0.0',
      mask: 16,
      minMask: 16,
      maxMask: 28,
    },
  ],
  [VendorEnum.GCP]: [
    {
      ip: '10.0.0.0',
      mask: 8,
      minMask: 16,
      maxMask: 28,
    },
    {
      ip: '172.16.0.0',
      mask: 12,
      minMask: 16,
      maxMask: 28,
    },
    {
      ip: '192.168.0.0',
      mask: 16,
      minMask: 16,
      maxMask: 28,
    },
  ],
  [VendorEnum.HUAWEI]: [
    {
      ip: '10.0.0.0',
      mask: 8,
      minMask: 8,
      maxMask: 28,
    },
    {
      ip: '172.16.0.0',
      mask: 12,
      minMask: 12,
      maxMask: 28,
    },
    {
      ip: '192.168.0.0',
      mask: 16,
      minMask: 16,
      maxMask: 28,
    },
  ],
}