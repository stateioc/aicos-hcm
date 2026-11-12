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

import { showLoginModal as showModal } from '@blueking/login-modal';

export const showLoginModal = () => {
  const successUrl = `${window.location.origin}/static/login_success.html`;

  const loginBaseUrl = window.PROJECT_CONFIG.BK_LOGIN_URL || '';
  if (!loginBaseUrl) {
    console.error('Login URL not configured!');
    return;
  }

  const loginURL = new URL(loginBaseUrl);
  loginURL.searchParams.set('c_url', successUrl);
  const pathname = loginURL.pathname.endsWith('/') ? loginURL.pathname : `${loginURL.pathname}/`;
  const loginUrl = `${loginURL.origin}${pathname}plain/${loginURL.search}`;

  showModal({
    loginUrl,
    onFail: () => {
      gotoLoginPage();
    },
  });
};

export const gotoLoginPage = (url?: string, isLogout = false) => {
  const rawUrl = url ?? window.PROJECT_CONFIG.BK_LOGIN_URL;
  if (!rawUrl) {
    console.error('The login URL is not configured!');
    return;
  }
  try {
    const loginURL = new URL(rawUrl);
    loginURL.searchParams.set('c_url', location.href);

    if (isLogout) {
      loginURL.searchParams.set('is_from_logout', '1');
    }

    location.href = loginURL.href;
  } catch (_) {
    console.error('The login URL invalid!');
  }
};
