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

/**
 * 负载均衡 - 购买
 */
// import http
import http from '@/http';
// import types
import { NetworkAccountTypeResp, ResourceOfCurrentRegionReqData, ResourceOfCurrentRegionResp } from './types';
import { VendorEnum } from '@/common/constant';

const { BK_HCM_AJAX_URL_PREFIX } = window.PROJECT_CONFIG;

// 查询用户网络类型
export const reqAccountNetworkType = async (
  vendor: VendorEnum,
  account_id: string,
): Promise<NetworkAccountTypeResp> => {
  return http.get(`${BK_HCM_AJAX_URL_PREFIX}/api/v1/cloud/vendors/${vendor}/accounts/${account_id}/network_type`);
};

// 查询用户在当前地域支持可用区列表和资源列表
export const reqResourceListOfCurrentRegion = async (
  vendor: VendorEnum,
  data: ResourceOfCurrentRegionReqData,
): Promise<ResourceOfCurrentRegionResp> => {
  return http.post(`${BK_HCM_AJAX_URL_PREFIX}/api/v1/cloud/vendors/${vendor}/load_balancers/resources/describe`, data);
};
