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

import { createI18n } from 'vue-i18n';

import Cookies from 'js-cookie';
import langMap from './lang';

export type Locale = 'zh-cn' | 'en' | string;
interface ILANG_PKG {
  [propName: string]: string;
}

const en: ILANG_PKG = {};
const zh: ILANG_PKG = {};
Object.keys(langMap).forEach((key) => {
  en[key] = langMap[key][0] || key;
  zh[key] = langMap[key][1] || key;
});

// const language = (navigator.language || 'en').toLocaleLowerCase();
const localLanguage = (Cookies.get('blueking_language') || 'zh-cn') as Locale;

const i18n = createI18n({
  silentTranslationWarn: true,
  legacy: false,
  locale: localLanguage,
  fallbackLocale: 'zh-cn',
  messages: {
    // 'zh-cn': Object.assign(lang.zhCN, zh),
    'zh-cn': zh,
    // en: Object.assign(lang.enUS, en),
    en,
  },
});

export const isChinese = localLanguage === 'zh-cn';

export default i18n;
