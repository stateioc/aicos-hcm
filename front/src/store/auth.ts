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

import { ref } from 'vue';
import { defineStore } from 'pinia';
import http from '@/http';
import { type IAuthSign, getVerifyParams } from '@/common/auth-service';
import { type IQueryResData } from '@/typings/common';

export interface IVerifyResourceInstance {
  type: string;
  type_name: string;
  id: number | string;
  name: string;
}

export interface IVerifyResult {
  results: {
    authorized: boolean;
  }[];
  permission?: {
    actions: {
      id: string;
      name: string;
      related_resource_types: {
        instances?: IVerifyResourceInstance[][];
        system_id: string;
        system_name: string;
        type: string;
        type_name: string;
      }[];
    }[];
    system_id: string;
    system_name: string;
  };
}

export const useAuthStore = defineStore('auth', () => {
  const applyPermUrlLoading = ref(false);

  const verify = async (authSign: IAuthSign | IAuthSign[]) => {
    try {
      const params = getVerifyParams(authSign);
      const res: IQueryResData<IVerifyResult> = await http.post('/api/v1/web/auth/verify', params);
      return {
        results: res.data?.results ?? [],
        permission: res.data?.permission,
      };
    } catch (error) {
      console.error(error);
      return Promise.reject(error);
    }
  };

  const getApplyPermUrl = async (params: IVerifyResult['permission']) => {
    try {
      applyPermUrlLoading.value = true;
      const res = await http.post('/api/v1/web/auth/find/apply_perm_url', params);
      return res.data;
    } finally {
      applyPermUrlLoading.value = false;
    }
  };

  return {
    verify,
    getApplyPermUrl,
    applyPermUrlLoading,
  };
});
