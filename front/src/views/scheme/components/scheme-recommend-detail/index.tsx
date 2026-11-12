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

import { defineComponent } from 'vue';
import './index.scss';
import DetailHeader from '../../scheme-detail/components/detail-header';
import { useSchemeStore } from '@/store';
import IdcMapDisplay from '../../scheme-detail/components/idc-map-display';
import NetworkHeatMap from '../../scheme-detail/components/network-heat-map';
import { ISchemeSelectorItem } from '@/typings/scheme';
import SaveSchemeButton from '../scheme-preview/components/save-scheme-button';

export default defineComponent({
  props: {
    onBack: {
      type: Function,
      required: true,
    },
  },
  setup(props) {
    const schemeStore = useSchemeStore();
    return () => (
      <div class={'scheme-recommend-detial-container'}>
        <DetailHeader
          schemeData={schemeStore.schemeData}
          schemeList={schemeStore.recommendationSchemes.map((v, idx) => ({
            ...v,
            id: `${idx}`,
          }))}
          onBack={props.onBack}
          selectFn={(scheme: ISchemeSelectorItem) => {
            schemeStore.setSelectedSchemeIdx(+scheme.id as number);
          }}>
          {{
            operate: () => <SaveSchemeButton idx={schemeStore.selectedSchemeIdx} />,
          }}
        </DetailHeader>
        <section class={'chart-content-wrapper'}>
          <IdcMapDisplay list={schemeStore.schemeData.idcList} class={'idc-map-display'} />
          <NetworkHeatMap
            idcList={schemeStore.schemeData.idcList}
            areaTopo={schemeStore.userDistribution}
            class={'network-heat-map'}
          />
        </section>
      </div>
    );
  },
});
