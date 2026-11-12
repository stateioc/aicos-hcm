// SPACE-AICOS is pleased to support the open source community by making
// SPACE-AICOS available.
// Copyright (C) 2026 China Academy of Information and Communications Technology (CAICT).
// All rights reserved.
// Licensed under the MIT License (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at http://opensource.org/licenses/MIT
// Unless required by applicable law or agreed to in writing,
// software distributed under the License is distributed on
// an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND,
// either express or implied. See the License for the
// specific language governing permissions and limitations under the License.
package apis

type NodeResourceInfo struct {
	ID                   string
	City                 string
	CompanyType          string
	Company              string
	ResourceType         string
	ResourceAZ           string
	ServiceType          string
	ComputeCapacity      string
	StorageCapacity      string
	NetworkBandSwitch    string
	PowerConsumption     string
	NetworkType          string
	PowerResourceAddress string
	ChipType             string
	ChipModel            string
	ChipUniqNumber       string
}

func ParseResourceInfo(data string) *NodeResourceInfo {
	return &NodeResourceInfo{
		ID:                   data[0:],
		City:                 data[0:4],
		CompanyType:          data[4:6],
		Company:              data[6:11],
		ResourceType:         data[11:14],
		ResourceAZ:           data[14:17],
		ServiceType:          data[17:31],
		ComputeCapacity:      data[31:36],
		StorageCapacity:      data[36:44],
		NetworkBandSwitch:    data[44:51],
		PowerConsumption:     data[51:57],
		NetworkType:          data[57:59],
		PowerResourceAddress: data[59:93],
		ChipType:             data[93:98],
		ChipModel:            data[98:106],
		ChipUniqNumber:       data[106:],
	}
}

func ResourceInfoToString(resource *NodeResourceInfo) string {
	return resource.City +
		resource.CompanyType +
		resource.Company +
		resource.ResourceType +
		resource.ResourceAZ +
		resource.ServiceType +
		resource.ComputeCapacity +
		resource.StorageCapacity +
		resource.NetworkBandSwitch +
		resource.PowerConsumption +
		resource.NetworkType +
		resource.PowerResourceAddress +
		resource.ChipType +
		resource.ChipModel +
		resource.ChipUniqNumber
}
