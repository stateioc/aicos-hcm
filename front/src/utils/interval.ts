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

/**
 * setTimeout 模拟 setInterval
 */
export default function interval(func: Function, wait: number, max = 0) {
  let timer: any = null;
  const count: number = Math.floor(max / wait);
  let now = 0;

  const interv = function (nowTimer: any) {
    if (timer !== nowTimer || (count > 0 && count < (now = now + 1))) return;
    func.call(null);
    setTimeout(() => interv(nowTimer), wait);
  };

  const clearTimeInterval = () => {
    clearTimeout(timer);
    now = 0;
    timer = null;
  };
  const setTimeInterval = () => {
    if (timer) return;
    timer = setTimeout(() => interv(timer), wait);
  };

  return {
    clearTimeInterval,
    setTimeInterval,
  };
}
