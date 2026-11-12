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

import { ModelPropertyGeneric, ModelPropertyColumn } from '@/model/typings';

export const findProperty = (
  id: ModelPropertyGeneric['id'],
  properties: ModelPropertyGeneric[],
  key?: keyof ModelPropertyGeneric,
) => {
  // 先按默认的规则找
  let found = properties.find((property) => property.id === id);

  // 找不到同时指定了key则再根据key再找一次
  if (!found && key) {
    found = properties.find((property) => property[key] === id);
  }

  return found;
};

export const getColumnName = (property: ModelPropertyColumn, options?: { showUnit: boolean }) => {
  const { showUnit = true } = options || {};
  const { name, unit } = property;
  return `${name}${showUnit && unit ? `（${unit}）` : ''}`;
};
