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

import router from '@/router';
import routerAction from './action';

export default {
  get route() {
    return router.currentRoute.value;
  },
  get(key: string, defaultValue: any) {
    if (Object.hasOwn(this.route.query, key)) {
      return this.route.query[key];
    }
    if (arguments.length === 2) {
      return defaultValue;
    }
  },
  getAll() {
    return this.route.query;
  },
  set(key: string | object, value?: string | number, refresh?: boolean) {
    const query = { ...this.route.query };
    if (typeof key === 'object') {
      Object.assign(query, key);
    } else {
      query[key] = value as string;
    }
    Object.keys(query).forEach((queryKey) => {
      if ([null, undefined].includes(query[queryKey])) {
        Reflect.deleteProperty(query, queryKey);
      }
    });

    if (refresh) {
      query._t = String(Date.now());
    }

    routerAction.redirect({ query });
  },
  setAll(value: object) {
    routerAction.redirect({
      ...this.route,
      query: {
        ...value,
      },
    });
  },
  delete(key: string) {
    const query = {
      ...this.route.query,
    };
    Reflect.deleteProperty(query, key);
    routerAction.redirect({
      ...this.route,
      query,
    });
  },
  refresh() {
    this.set('_t', Date.now());
  },
  clear() {
    routerAction.redirect({
      ...this.route,
      query: {},
    });
  },
};
