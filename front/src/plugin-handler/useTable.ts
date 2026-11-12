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

export const fetchData = async (params: any) => {
  const { api, props, pagination, sort, order, filter, type } = params;
  const { requestOption } = props;
  const { apiMethod, extension, full } = requestOption;

  // type api
  if (requestOption.type) {
    // 判断是业务下, 还是资源下
    const fetchApi = async (page: any) =>
      api(
        {
          page,
          filter: { op: filter.op, rules: filter.rules },
          ...(typeof extension === 'function' ? extension() : extension),
        },
        type || requestOption.type,
      );

    // 请求数据
    return await Promise.all([
      fetchApi({
        limit: pagination.limit,
        start: pagination.start,
        sort: sort.value,
        order: order.value,
        count: false,
      }),
      fetchApi({ count: true }),
    ]);
  }

  // apiMethod api
  if (full) {
    // 非分页请求
    return [await apiMethod(extension), null];
  }

  const fetchApi = async (page: any) =>
    apiMethod({
      page,
      filter: { op: filter.op, rules: filter.rules },
      ...(typeof extension === 'function' ? extension() : extension),
    });

  // 分页请求
  return await Promise.all([
    fetchApi({
      limit: pagination.limit,
      start: pagination.start,
      sort: sort.value,
      order: order.value,
      count: false,
    }),
    fetchApi({ count: true }),
  ]);
};
