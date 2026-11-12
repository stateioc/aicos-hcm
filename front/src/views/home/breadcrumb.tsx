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

import { computed, defineComponent } from 'vue';
import { useRoute } from 'vue-router';
import useBreadcrumb from '@/hooks/use-breadcrumb';
import { useBack } from '@/router/hooks/use-back';
import type { RouteMetaConfig } from '@/router/meta';

import './breadcrumb.scss';

export default defineComponent({
  setup() {
    const { breadcrumb } = useBreadcrumb();
    const { from, handleBack } = useBack();
    const route = useRoute();

    const currentTitle = computed(() => {
      const routeMeta = route.meta as RouteMetaConfig;
      return breadcrumb.title ?? routeMeta.title ?? routeMeta?.menu?.i18n;
    });

    return {
      from,
      breadcrumb,
      currentTitle,
      handleBack,
    };
  },

  render() {
    return (
      this.breadcrumb.display && (
        <div class='navigation-breadcrumb'>
          <div class='breadcrumb-content'>
            {this.from && (
              <i
                onClick={() => this.handleBack()}
                class={'icon hcm-icon bkhcm-icon-arrows--left-line pr10 back-icon'}
              />
            )}
            <span class='breadcrumb-name'>{this.currentTitle}</span>
          </div>
          <div id='breadcrumbExtra' class='breadcrumb-extra'></div>
        </div>
      )
    );
  },
});
