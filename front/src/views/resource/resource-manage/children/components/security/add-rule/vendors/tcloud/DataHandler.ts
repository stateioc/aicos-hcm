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

import { cloneDeep } from 'lodash-es';
import { TcloudSecurityGroupRule, TcloudSourceTypeArr, TcloudTemplatePort, TcloudTemplatePortArr } from '.';
import { TcloudSourceAddressType } from './SourceAddress';

export const tcloudHandler = (data: TcloudSecurityGroupRule & { sourceAddress: TcloudSourceAddressType }) => {
  // 协议选择参数模板端口/端口组
  if (TcloudTemplatePortArr.includes(data.protocol as TcloudTemplatePort)) {
    delete data.protocol;
    delete data.port;
  }
  // 仅保留选中的源地址类型
  TcloudSourceTypeArr.forEach((type) => data.sourceAddress !== type && delete data[type]);
};

export const tcloudPreHandler = (data: TcloudSecurityGroupRule & { sourceAddress: TcloudSourceAddressType }) => {
  const res = cloneDeep(data);
  // 源地址类型
  TcloudSourceTypeArr.forEach((type) => res[type] && (res.sourceAddress = type));

  // 协议为参数模板时，给协议、端口赋值
  TcloudTemplatePortArr.forEach((type) => res[type] && (res.protocol = type));

  return res;
};
