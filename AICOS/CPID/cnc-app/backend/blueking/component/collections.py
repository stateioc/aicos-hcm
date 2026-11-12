# -*- coding: utf-8 -*-
# SPACE-AICOS is pleased to support the open source community by making
# SPACE-AICOS available.
# Copyright (C) 2026 China Academy of Information and Communications Technology (CAICT).
# All rights reserved.
# Licensed under the MIT License (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at http://opensource.org/licenses/MIT
# Unless required by applicable law or agreed to in writing,
# software distributed under the License is distributed on
# an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND,
# either express or implied. See the License for the
# specific language governing permissions and limitations under the License.
"""Collections for component client"""
from .apis.bk_login import CollectionsBkLogin
from .apis.bk_paas import CollectionsBkPaas
from .apis.cc import CollectionsCC
from .apis.cmsi import CollectionsCMSI
from .apis.gse import CollectionsGSE
from .apis.itsm import CollectionsITSM
from .apis.job import CollectionsJOB
from .apis.jobv3 import CollectionsJOBV3
from .apis.monitor_v3 import CollectionsMonitorV3
from .apis.sops import CollectionsSOPS
from .apis.usermanage import CollectionsUSERMANAGE


# Available components
AVAILABLE_COLLECTIONS = {
    'bk_login': CollectionsBkLogin,
    'bk_paas': CollectionsBkPaas,
    'cc': CollectionsCC,
    'cmsi': CollectionsCMSI,
    'gse': CollectionsGSE,
    'itsm': CollectionsITSM,
    'job': CollectionsJOB,
    'jobv3': CollectionsJOBV3,
    'monitor_v3': CollectionsMonitorV3,
    'sops': CollectionsSOPS,
    'usermanage': CollectionsUSERMANAGE,
}
