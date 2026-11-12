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

export const jsonp = <T>(
  url: string,
  data: object,
  options?: { callbackName?: string; version?: string },
): Promise<T> => {
  if (!url) throw new Error('invalid URL');

  const { callbackName = '', version = '' } = options || {};

  const callback = (callbackName || `CALLBACK${Math.random().toString().slice(9, 18)}`) as keyof Window;

  const JSONP = document.createElement('script');
  JSONP.setAttribute('type', 'text/javascript');

  const headEle = document.getElementsByTagName('head')[0];

  const t = version || Date.now();
  let query = `&_t=${t}`;
  if (data) {
    if (typeof data === 'string') {
      query = `&${data}`;
    } else if (typeof data === 'object') {
      for (const [key, value] of Object.entries(data)) {
        query += `&${key}=${encodeURIComponent(value)}`;
      }
    }
  }

  let promiseRejecter: (event: Event | string) => void;

  const rejectFn = (event: Event | string) => {
    promiseRejecter?.(event);
    window.removeEventListener('error', rejectFn);
  };

  JSONP.src = `${url}?callback=${callback}${query}`;
  JSONP.onerror = rejectFn;

  window.addEventListener('error', rejectFn);

  return new Promise((resolve, reject) => {
    promiseRejecter = reject;
    try {
      (window[callback] as unknown) = (result: T) => {
        resolve(result);
        headEle.removeChild(JSONP);
        delete window[callback];
      };
      headEle.appendChild(JSONP);
    } catch (err) {
      reject(err);
    }
  });
};
