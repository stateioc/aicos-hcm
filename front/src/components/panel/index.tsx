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

/* eslint-disable no-nested-ternary */
import { PropType, VNode, defineComponent, computed } from 'vue';
import cssModule from './index.module.scss';

export default defineComponent({
  props: {
    title: {
      type: [Function, String] as PropType<(() => string | HTMLElement | VNode) | String>,
      default: () => '',
    },
    noShadow: Boolean as PropType<boolean>,
  },

  setup(props, { slots }) {
    const renderTitle = computed(() => (typeof props?.title === 'function' ? props.title() : props.title));
    return () => (
      <section class={!props.noShadow ? cssModule.home : undefined}>
        {slots.title ? slots.title() : props.title ? <span class={cssModule.title}>{renderTitle.value}</span> : null}
        {slots.default()}
      </section>
    );
  },
});
