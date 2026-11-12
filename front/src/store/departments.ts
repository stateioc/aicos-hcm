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

import http from '@/http';
// import { Department } from '@/typings';
import { defineStore } from 'pinia';
import QueryString from 'qs';
const { BK_COMPONENT_API_URL } = window.PROJECT_CONFIG;

export const useDepartmentStore = defineStore({
  id: 'departmentStore',
  state: () => ({
    departmentMap: new Map(),
  }),
  actions: {
    async fetchDepartMents(field: string, lookups: number) {
      const prefix = `${BK_COMPONENT_API_URL}/api/c/compapi/v2/usermanage/fe_list_departments/`;
      const params = {
        app_code: 'magicbox',
        no_page: true,
        lookup_field: 'parent',
        // exact_lookups: lookups,
        callback: 'callbackDepart',
      };
      const scriptTag = document.createElement('script');
      scriptTag.setAttribute('type', 'text/javascript');
      scriptTag.setAttribute('src', `${prefix}?${QueryString.stringify(params)}`);

      const headTag = document.getElementsByTagName('head')[0];
      // @ts-ignore
      window[params.callback] = ({ data, result }: { data: Staff[]; result: boolean }) => {
        if (result) {
          if (field === 'level') {
            data.forEach((item: any) => {
              this.departmentMap.set(item.id, item);
            });
          } else {
            data.forEach((item: any) => {
              this.departmentMap.set(item.id, {
                ...item,
                parent: lookups,
              });
            });
            const parent = this.departmentMap.get(lookups);
            Object.assign(parent, {
              loaded: true,
              loading: false,
            });
          }
          // return data;
        }
        headTag.removeChild(scriptTag);
        // @ts-ignore
        delete window[params.callback];
      };
      headTag.appendChild(scriptTag);
    },
    async getRootDept() {
      try {
        this.fetchDepartMents('level', 0);
      } catch (error) {
        console.error(error);
      }
    },
    async getChildDept(dept_id: number) {
      const parent = this.departmentMap.get(dept_id);
      if (parent) {
        parent.loading = true;
      }
      this.fetchDepartMents('parent', dept_id);
    },
    async getParentIds(dept_ids: string) {
      const res = await http.get('/usermanage/batch_request_department_parent_id/', {
        params: {
          dept_ids,
        },
      });
      return res;
    },
  },
});
