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

import { type ComputedRef, isRef } from 'vue';
import { type LocationQuery } from 'vue-router';
import qs from 'qs';
import { ModelPropertyGeneric } from '@/model/typings';
import { findProperty } from '@/model/utils';
import routeQuery from '@/router/utils/query';
import { convertValue } from '@/utils/search';

type useSearchQsParamsType = {
  properties: ModelPropertyGeneric[] | ComputedRef<ModelPropertyGeneric[]>;
  key?: string;
  forceUpdate?: boolean;
  resetPage?: boolean;
};

export default function useSearchQs({
  properties,
  key = 'filter',
  forceUpdate = true,
  resetPage = true,
}: useSearchQsParamsType) {
  const set = (value: Record<string, string | number | string[] | number[]>) => {
    const queryVal = qs.stringify(value, {
      arrayFormat: 'comma',
      encode: false,
    });

    const updateQuery = { [key]: queryVal };
    if (resetPage) {
      updateQuery.page = undefined;
    }
    routeQuery.set(updateQuery, null, forceUpdate);
  };

  const get = (query: LocationQuery, defaults?: Record<string, any>) => {
    if (!Object.hasOwn(query, key)) {
      return { ...defaults };
    }
    const condition: Record<string, any> = {};
    const filter = qs.parse(query[key] as string, { comma: true });
    for (const [id, val] of Object.entries(filter)) {
      const property = findProperty(id, isRef(properties) ? properties.value : properties);
      if (!property) {
        continue;
      }
      condition[id] = convertValue(val, property);
    }
    return condition;
  };

  const clear = () => {
    routeQuery.delete(key);
  };

  return {
    get,
    set,
    clear,
  };
}
