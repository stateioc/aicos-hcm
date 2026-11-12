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

import { convertToIdNameMap } from './util';

export enum AccountLevelEnum {
  FirstLevel = 'firstAccount',
  SecondLevel = 'secondaryAccount',
}

export const tabs = [
  {
    key: AccountLevelEnum.FirstLevel,
    label: '一级账号',
    component: '',
  },
  {
    key: AccountLevelEnum.SecondLevel,
    label: '二级账号',
  },
];

// 云厂商
export const BILL_VENDORS = [
  {
    id: 'tcloud',
    name: '腾讯云',
  },
  {
    id: 'aws',
    name: '亚马逊云',
  },
  {
    id: 'azure',
    name: '微软云',
  },
  {
    id: 'gcp',
    name: '谷歌云',
  },
  {
    id: 'huawei',
    name: '华为云',
  },
  {
    id: 'zenlayer',
    name: 'zenlayer',
  },
  {
    id: 'kaopu',
    name: '靠谱云',
  },
];

export const BILL_VENDORS_MAP = convertToIdNameMap(BILL_VENDORS);

export const searchData = [
  {
    name: '一级帐号名称',
    id: 'name',
  },
  {
    name: '一级帐号ID',
    id: 'cloud_id',
  },
  {
    name: '云厂商',
    id: 'vendor',
    children: BILL_VENDORS,
  },
  {
    name: '帐号邮箱',
    id: 'email',
  },
];

export const BILL_SITE_TYPES = [
  {
    name: '中国站',
    id: 'china',
  },
  {
    name: '国际站',
    id: 'international',
  },
];

export const BILL_SITE_TYPES_MAP = convertToIdNameMap(BILL_SITE_TYPES);

export const secondarySearchData = [
  {
    name: '二级帐号名称',
    id: 'name',
  },
  {
    name: '二级帐号ID',
    id: 'cloud_id',
  },
  {
    name: '所属一级帐号名称',
    id: 'parent_account_name',
  },
  {
    name: '云厂商',
    id: 'vendor',
  },
  {
    name: '站点类型',
    id: 'site',
    children: BILL_SITE_TYPES,
  },
  {
    name: '帐号邮箱',
    id: 'accountEmail',
  },
];
