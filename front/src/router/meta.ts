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

interface Menu {
  i18n?: string;
  parent?: any;
  relative?: any;
}

interface AuthView {
  type: string;
  relation?: number[] | string[];
}

interface Auth {
  superView?: any;
  view?: AuthView | (() => AuthView);
  operation?: any;
  permission?: any;
}

interface Layout {
  breadcrumbs?: {
    show?: boolean;
    back?: boolean;
  };
}

interface Extra {
  [key: string]: any;
}

export interface RouteMetaConfig {
  available?: boolean;
  owner?: symbol | string;
  title?: string;
  authKey?: string;
  view?: string;
  extra?: Extra;
  menu?: Menu;
  auth?: Auth;
  layout?: Layout;
  notMenu?: boolean;
  activeKey?: symbol | string;
  isShowBreadcrumb?: boolean;
  icon?: string;
}

export default class Meta {
  available = true;

  owner = '';

  title = '';

  authKey = 'view';

  view = 'default';

  extra: Extra = {};

  menu: Menu = {};

  auth: Auth = {};

  layout: Layout = {};

  constructor(data: RouteMetaConfig) {
    Object.keys(data).forEach((key) => {
      const typedKey = key as keyof RouteMetaConfig;
      Reflect.set(this, typedKey, data[typedKey]);
    });

    this.menu.i18n = this.title;

    this.menu = Object.assign(this.menu, data.menu);

    this.auth = Object.assign(this.auth, data.auth);

    this.layout = Object.assign(this.layout, data.layout);

    this.extra = Object.assign(this.extra, data.extra);
  }
}
