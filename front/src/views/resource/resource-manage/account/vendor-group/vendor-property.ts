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
import tcloudVendorIcon from '@/assets/image/vendor-tcloud.svg';
import awsVendorIcon from '@/assets/image/vendor-aws.svg';
import azureVendorIcon from '@/assets/image/vendor-azure.svg';
import gcpVendorIcon from '@/assets/image/vendor-gcp.svg';
import huaweiVendorIcon from '@/assets/image/vendor-huawei.svg';
import otherVendorIcon from '@/assets/image/vendor-other.svg';

export const vendorProperty = new Map<VendorEnum, { icon: any }>([
  [
    VendorEnum.TCLOUD,
    {
      icon: tcloudVendorIcon,
    },
  ],
  [
    VendorEnum.AWS,
    {
      icon: awsVendorIcon,
    },
  ],
  [
    VendorEnum.AZURE,
    {
      icon: azureVendorIcon,
    },
  ],
  [
    VendorEnum.GCP,
    {
      icon: gcpVendorIcon,
    },
  ],
  [
    VendorEnum.HUAWEI,
    {
      icon: huaweiVendorIcon,
    },
  ],
  [
    VendorEnum.OTHER,
    {
      icon: otherVendorIcon,
    },
  ],
]);
