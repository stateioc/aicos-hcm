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

import { getModel } from '@/model/manager';
import { DisplayFieldClb } from './field-clb';
import { DisplayFieldListener } from './field-listener';
import { DisplayFieldRs } from './field-rs';
import { DisplayFieldRule } from './field-rule';
import { DisplayFieldUrlRule } from './field-url-rule';

export enum DisplayFieldType {
  CLB = 'clb',
  LISTENER = 'listener',
  RS = 'rs',
  Rule = 'rule',
  URL = 'url-rule',
  DeviceRs = 'device-rs',
}

export class DisplayFieldFactory {
  static createModel(key: DisplayFieldType) {
    switch (key) {
      case DisplayFieldType.CLB:
        return getModel(DisplayFieldClb);
      case DisplayFieldType.LISTENER:
        return getModel(DisplayFieldListener);
      case DisplayFieldType.RS:
        return getModel(DisplayFieldRs);
      case DisplayFieldType.Rule:
        return getModel(DisplayFieldRule);
      case DisplayFieldType.URL:
        return getModel(DisplayFieldUrlRule);
    }
  }
}
