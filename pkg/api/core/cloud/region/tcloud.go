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

package region

import (
	"hcm/pkg/criteria/enumor"
)

// Region define region.
type Region interface {
	TCloudRegion | AwsRegion | GcpRegion
}

// TCloudRegion define tcloud region.
type TCloudRegion struct {
	ID         string        `json:"id"`
	Vendor     enumor.Vendor `json:"vendor"`
	RegionID   string        `json:"region_id"`
	RegionName string        `json:"region_name"`
	AreaName   string        `json:"area_name"`
	Status     string        `json:"status"`
	Creator    string        `json:"creator"`
	Reviser    string        `json:"reviser"`
	CreatedAt  string        `json:"created_at"`
	UpdatedAt  string        `json:"updated_at"`
}

// GetID ...
func (region TCloudRegion) GetID() string {
	return region.ID
}

// GetCloudID ...
func (region TCloudRegion) GetCloudID() string {
	return region.RegionID
}
