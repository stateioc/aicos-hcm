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

package azure

import (
	"fmt"

	resourcegroup "hcm/pkg/adaptor/types/resource-group"
	"hcm/pkg/kit"

	"github.com/Azure/azure-sdk-for-go/sdk/resourcemanager/resources/armresources"
)

// ListResourceGroup list resource group.
// reference: https://learn.microsoft.com/en-us/rest/api/resources/resource-groups/list#resourcegroup
func (az *Azure) ListResourceGroup(kt *kit.Kit) ([]*resourcegroup.AzureResourceGroup, error) {

	client, err := az.clientSet.resourceGroupsClient()
	if err != nil {
		return nil, fmt.Errorf("new resourceGroupsClient failed, err: %v", err)
	}

	resourceGroup := make([]*armresources.ResourceGroup, 0)
	pager := client.NewListPager(nil)
	for pager.More() {
		nextResult, err := pager.NextPage(kt.Ctx)
		if err != nil {
			return nil, fmt.Errorf("failed to advance page: %v", err)
		}
		resourceGroup = append(resourceGroup, nextResult.Value...)
	}

	typesResourceGroup := make([]*resourcegroup.AzureResourceGroup, 0)
	for _, v := range resourceGroup {
		tmp := &resourcegroup.AzureResourceGroup{
			Name:     SPtrToLowerSPtr(v.Name),
			Type:     v.Type,
			Location: SPtrToLowerNoSpaceSPtr(v.Location),
		}
		typesResourceGroup = append(typesResourceGroup, tmp)
	}
	return typesResourceGroup, nil
}
