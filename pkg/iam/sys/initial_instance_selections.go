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

package sys

import "hcm/pkg/iam/client"

// GenerateStaticInstanceSelections return need registered static instance selection.
func GenerateStaticInstanceSelections() []client.InstanceSelection {
	return []client.InstanceSelection{
		{
			ID:     AccountSelection,
			Name:   "账号列表",
			NameEn: "Account List",
			ResourceTypeChain: []client.ResourceChain{
				{
					SystemID: SystemIDHCM,
					ID:       Account,
				},
			},
		},
		{
			ID:     CloudSelectionSchemeSelection,
			Name:   "方案列表",
			NameEn: "Scheme List",
			ResourceTypeChain: []client.ResourceChain{
				{
					SystemID: SystemIDHCM,
					ID:       CloudSelectionScheme,
				},
			},
		},
		{
			ID:     MainAccountSelection,
			Name:   "二级账号列表",
			NameEn: "Main Account List",
			ResourceTypeChain: []client.ResourceChain{
				{
					SystemID: SystemIDHCM,
					ID:       MainAccount,
				},
			},
		},
		{
			ID:     BillCloudVendorSelection,
			Name:   "账单云厂商列表",
			NameEn: "Bill Cloud Vendor List",
			ResourceTypeChain: []client.ResourceChain{
				{
					SystemID: SystemIDHCM,
					ID:       BillCloudVendor,
				},
			},
		},
	}
}
