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

import { getMetadataStorage } from '@/decorator/metadata/globals';
import type { IColumnMetadata } from '@/decorator/typings';
import type { ModelPropertyGeneric } from './typings';
import type { ObjectType } from './manager';

export class Model<M> {
  instance: M;

  target: Function;

  constructor(ModelClass: ObjectType<M>) {
    this.target = ModelClass;
    this.instance = new ModelClass();
  }

  getProperties<T extends ModelPropertyGeneric>(): T[] {
    const columnMetadata = getMetadataStorage().columns.filter(
      (item: IColumnMetadata) => item.target === this.target || this.target.prototype instanceof (item.target as any),
    );
    const properties = columnMetadata.map((item: IColumnMetadata) => item.def);
    return properties.sort((a: ModelPropertyGeneric, b: ModelPropertyGeneric) => a.index - b.index);
  }
}
