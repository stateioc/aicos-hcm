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
import { ref } from 'vue';
const { BK_HCM_AJAX_URL_PREFIX } = window.PROJECT_CONFIG;

export const useFavorite = (bk_biz_id: number, favoriteList: Array<number>) => {
  const set = ref(new Set<number>());
  for (const id of favoriteList) set.value.add(id);

  const addToFavorite = (bk_biz_id: number) => {
    set.value.add(bk_biz_id);
    addFavorite(bk_biz_id);
  };

  const removeFromFavorite = (bk_biz_id: number) => {
    set.value.delete(bk_biz_id);
    removeFavorite(bk_biz_id);
  };

  return {
    favoriteSet: set,
    addToFavorite,
    removeFromFavorite,
  };
};

/**
 * 查询用户收藏的业务ID列表
 * @param bk_biz_id 业务ID
 */
export const getFavoriteList = async (bk_biz_id: number): Promise<Array<number>> => {
  const { data } = await http.get(`${BK_HCM_AJAX_URL_PREFIX}/api/v1/cloud/bizs/${bk_biz_id}/collections/bizs`);
  return data;
};

export const addFavorite = async (bk_biz_id: number) => {
  return await http.post(`${BK_HCM_AJAX_URL_PREFIX}/api/v1/cloud/bizs/${bk_biz_id}/collections/bizs/create`, {
    bk_biz_id,
  });
};

export const removeFavorite = async (bk_biz_id: number) => {
  return await http.delete(`${BK_HCM_AJAX_URL_PREFIX}/api/v1/cloud/bizs/${bk_biz_id}/collections/bizs`, {
    data: { bk_biz_id },
  });
};
