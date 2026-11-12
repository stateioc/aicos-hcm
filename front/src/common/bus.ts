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

import mitt from 'mitt';
import type { Emitter } from 'mitt';

type Events = {
  foo: string;
  bar?: number;
  [key: string]: any;
};

interface IBus {
  $on: Emitter<Events>['on'];
  $off: Emitter<Events>['off'];
  $emit: Emitter<Events>['emit'];
}

const emitter = mitt<Events>();
const bus: IBus = {
  $on: emitter.on,
  $off: emitter.off,
  $emit: emitter.emit,
};

export default bus;
