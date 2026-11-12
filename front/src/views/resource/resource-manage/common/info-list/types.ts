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

import { IAuthSign } from '@/common/auth-service';
import { JSX } from 'vue/jsx-runtime';

type StringCell = string | ((cell: string) => string); // 字符串或者返回字符串的函数

type BaseField = {
  name: string;
  value?: any;
  trim?: boolean;
  cls?: StringCell;
  link?: StringCell;
  copy?: boolean;
  edit?: boolean;
  type?: string;
  prop?: string;
  tipsContent?: string;
  txtBtn?: (cell: string) => void;
  showOverflowTips?: boolean;
  getAuthSign?: () => IAuthSign | IAuthSign[];
};
type FieldWithRenderString = BaseField & {
  render: (value: BaseField['value']) => string | number;
  copyContent?: StringCell; // 可选
};
type FieldWithRenderJSX = BaseField & {
  render: (value: BaseField['value']) => JSX.Element | '--';
  copyContent?: StringCell; // 必填
};
type FieldWithoutRender = BaseField & {
  render?: never; // 不传
  copyContent?: StringCell; // 可选
};

export type Field = FieldWithRenderString | FieldWithRenderJSX | FieldWithoutRender;
/*
  1.如果 render 返回 JSX.Element，copyContent 必须提供。
  2.如果 render 返回 string 或 render 未定义，copyContent 是可选的。
*/
export type EnsureValidField<F extends Field> = F extends { render: (value: BaseField['value']) => JSX.Element | '--' }
  ? (F & { copy: false }) | (F & { copyContent: StringCell })
  : F;

export type FieldList = Array<EnsureValidField<Field>>;
