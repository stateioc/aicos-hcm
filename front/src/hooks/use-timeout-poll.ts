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

import { getCurrentScope, onScopeDispose, ref } from 'vue';
import type { Awaitable } from '@/typings';

export type TimeoutPollAction = ReturnType<typeof useTimeoutPoll>;

export default function useTimeoutPoll(
  fn: () => Awaitable<void>,
  interval: number,
  options?: { immediate?: boolean; max?: number },
) {
  const { immediate = false, max = 100 } = options || {};

  const isActive = ref(false);

  let timer: ReturnType<typeof setTimeout> | null = null;

  let times = 0;

  function clear() {
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }
  }

  function start() {
    clear();
    timer = setTimeout(() => {
      timer = null;

      loop();
    }, interval ?? 5000);
  }

  async function loop() {
    if (!isActive.value) {
      return;
    }

    if (max !== -1 && times >= max) {
      return;
    }
    times += 1;

    await fn();
    start();
  }

  function resume() {
    if (!isActive.value) {
      isActive.value = true;
      immediate ? loop() : start();
    }
  }

  function pause() {
    isActive.value = false;
  }

  function reset() {
    clear();
    isActive.value = false;
    times = 0;
  }

  if (immediate) {
    resume();
  }

  if (getCurrentScope()) {
    onScopeDispose(pause);
  }

  return {
    isActive,
    pause,
    resume,
    reset,
  };
}
