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

/* eslint-disable @typescript-eslint/member-ordering */
import type { RouteLocationRaw, RouteRecordNameGeneric } from 'vue-router';

export class HistoryStorage {
  private static key = 'history';

  get history() {
    return HistoryStorage.get();
  }

  static get() {
    let historyList = [];
    try {
      historyList = JSON.parse(window.sessionStorage.getItem(this.key)) || [];
      if (!Array.isArray(historyList)) {
        historyList = [historyList];
      }
    } catch (e) {
      historyList = [];
    }
    return historyList;
  }

  static append(data: RouteLocationRaw) {
    const base64 = btoa(JSON.stringify(data));
    const historyList = this.get();
    historyList.push(base64);
    window.sessionStorage.setItem(this.key, JSON.stringify(historyList));
  }

  static remove(name: RouteRecordNameGeneric) {
    const historyList = this.get();
    const index = historyList.findIndex((item) => {
      const history = JSON.parse(atob(item));
      return history.name === name;
    });
    if (index !== -1) {
      historyList.splice(index, 1);
      window.sessionStorage.setItem(this.key, JSON.stringify(historyList));
    }
  }

  static pop(): RouteLocationRaw {
    const historyList = this.get();
    const record = historyList.pop();
    const route = JSON.parse(atob(record));
    return route;
  }

  static clear() {
    window.sessionStorage.setItem(this.key, JSON.stringify([]));
  }
}
