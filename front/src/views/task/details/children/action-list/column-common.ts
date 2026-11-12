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

import { ModelPropertyColumn } from '@/model/typings';
import { ResourceTypeEnum } from '@/common/resource-constant';
import taskDetailsViewProperties from '@/model/task/detail.view';
import { ITaskItem } from '@/store';
import { type TaskType } from '@/views/task/typings';
import { baseFieldIds, fieldIdMap, fieldRerunIdMap, fieldRerunBaseIdMap, baseColumnConfig } from './fields';

const taskActionViewProperties: ModelPropertyColumn[] = [...taskDetailsViewProperties];

export const getColumnIds = (resourceType: ResourceTypeEnum, operation: TaskType) => {
  const resourceColumnIds = fieldIdMap.get(resourceType);
  return resourceColumnIds[operation] || baseFieldIds;
};

const getColumns = (type: ResourceTypeEnum, operations?: ITaskItem['operations']) => {
  const [operation] = operations || [];
  const columnIds = getColumnIds(type, operation as TaskType);
  return columnIds.map((id) => ({
    ...taskActionViewProperties.find((item) => item.id === id),
    ...baseColumnConfig[id],
  }));
};

const getRerunColumns = (type: ResourceTypeEnum, operations?: ITaskItem['operations']) => {
  const [operation] = operations || [];
  const fields = fieldRerunIdMap.get(type);
  const operationFields = fields[operation as TaskType] || fieldRerunBaseIdMap;

  const columns = [];
  for (const [fieldId, setting] of Object.entries(operationFields)) {
    const newSetting = setting;
    if (!Object.hasOwn(newSetting, 'display')) {
      newSetting.display = {};
    }
    newSetting.display.on = 'cell';
    columns.push({
      field: taskActionViewProperties.find((item) => item.id === fieldId),
      setting: newSetting,
    });
  }
  return columns;
};

const factory = {
  getColumns,
  getRerunColumns,
};

export type FactoryType = typeof factory;

export default factory;
