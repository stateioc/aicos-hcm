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

import { type RouteLocationNormalizedLoaded } from 'vue-router';
import { useWhereAmI } from '@/hooks/useWhereAmI';
import { IAccountItem } from '@/typings';
import { ResourceTypeEnum } from '@/common/constant';

export default abstract class {
  accountFilter(
    list: IAccountItem[],
    {
      route,
      whereAmI,
      resourceType,
    }: {
      route: RouteLocationNormalizedLoaded;
      whereAmI: ReturnType<typeof useWhereAmI>;
      resourceType?: ResourceTypeEnum;
    },
  ) {
    const { isResourcePage } = whereAmI;
    // 负载均衡、目标组、证书托管、参数模板这四个暂时只腾讯云支持
    if (
      (isResourcePage && route.query.type === 'certs') ||
      route.query.scene === 'template' ||
      (route.meta.isFilterAccount as boolean) ||
      resourceType === ResourceTypeEnum.CLB
    ) {
      return list.filter(this.filterfn);
    }
    return list;
  }

  abstract filterfn(value: IAccountItem, index: number, array: IAccountItem[]): unknown;
}
