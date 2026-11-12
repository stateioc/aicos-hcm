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

import { VNode } from 'vue';
import { ResourceActionType } from './constants';
import type { IAuthSign } from '@/common/auth-service';

interface Clickable {
  loading?: () => boolean;
  disabled?: () => boolean; // 通常涉及到响应式计算，定义为函数
  handleClick?: () => void;
  authSign?: () => IAuthSign | IAuthSign[]; // 预鉴权配置参数可能需要进行响应式计算，因此这里定义为函数
}

export interface ActionItemType extends Clickable {
  type?: 'button' | 'dropdown';
  label?: string;
  value?: ResourceActionType;
  index?: number;
  children?: ActionItemType[];
  displayProps?: Record<string, any>; // 配置组件表现层面的props
  render?: () => VNode;
  prefix?: () => VNode;
}
