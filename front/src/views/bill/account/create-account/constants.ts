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
import tcloudVendor from '@/assets/image/vendor-tcloud.svg';
import awsVendor from '@/assets/image/vendor-aws.svg';
import azureVendor from '@/assets/image/vendor-azure.svg';
import gcpVendor from '@/assets/image/vendor-gcp.svg';
import huaweiVendor from '@/assets/image/vendor-huawei.svg';
import zenlayerVendor from '@/assets/image/zenlayer.png';
import kaopuVendor from '@/assets/image/kaopu.png';
import disabledTcloudVendor from '@/assets/image/disabled-tcloud.png';

export const VENDORS_INFO = [
  {
    vendor: VendorEnum.TCLOUD,
    name: '腾讯云',
    icon: tcloudVendor,
  },
  {
    vendor: VendorEnum.AWS,
    name: '亚马逊云',
    icon: awsVendor,
  },
  {
    vendor: VendorEnum.AZURE,
    name: '微软云',
    icon: azureVendor,
  },
  {
    vendor: VendorEnum.GCP,
    name: '谷歌云',
    icon: gcpVendor,
  },
  {
    vendor: VendorEnum.HUAWEI,
    name: '华为云',
    icon: huaweiVendor,
  },
];

export const BILL_VENDORS_INFO = [
  {
    vendor: VendorEnum.GCP,
    name: '谷歌云',
    icon: gcpVendor,
  },
  {
    vendor: VendorEnum.HUAWEI,
    name: '华为云',
    icon: huaweiVendor,
  },
  {
    vendor: VendorEnum.AWS,
    name: '亚马逊云',
    icon: awsVendor,
  },
  {
    vendor: VendorEnum.AZURE,
    name: '微软云',
    icon: azureVendor,
  },
  {
    vendor: VendorEnum.ZENLAYER,
    name: 'zenlayer',
    icon: zenlayerVendor,
  },
  {
    vendor: VendorEnum.KAOPU,
    name: '靠谱云',
    icon: kaopuVendor,
  },
];

export const MAIN_ACCOUNT_VENDORS = [
  ...BILL_VENDORS_INFO,
  {
    vendor: VendorEnum.TCLOUD,
    name: '腾讯云',
    icon: disabledTcloudVendor,
  },
];
