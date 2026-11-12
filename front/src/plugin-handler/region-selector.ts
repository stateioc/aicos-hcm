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

import { CLOUD_AREA_REGION_AWS, CLOUD_AREA_REGION_GCP, VendorEnum } from '@/common/constant';

export const getRegionName = (isChinese: boolean, vendor: VendorEnum, key: string, name: string) => {
  switch (vendor) {
    case VendorEnum.AWS:
      return isChinese ? CLOUD_AREA_REGION_AWS[key] : key;
    case VendorEnum.GCP:
      return isChinese ? CLOUD_AREA_REGION_GCP[key] : key;
    case VendorEnum.TCLOUD:
    case VendorEnum.HUAWEI:
      return isChinese ? name : key;
    case VendorEnum.AZURE:
      return name;
    default:
      return '--';
  }
};
