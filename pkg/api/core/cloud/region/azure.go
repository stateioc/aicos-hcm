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

// AzureRegion define azure region.
type AzureRegion struct {
	ID                string `json:"id"`
	CloudID           string `json:"cloud_id"`
	Name              string `json:"name"`
	Type              string `json:"type"`
	DisplayName       string `json:"display_name"`
	RegionDisplayName string `json:"region_display_name"`
	GeographyGroup    string `json:"geography_group"`
	Latitude          string `json:"latitude"`
	Longitude         string `json:"longitude"`
	PhysicalLocation  string `json:"physical_location"`
	RegionType        string `json:"region_type"`
	PairedRegionName  string `json:"paired_region_name"`
	PairedRegionId    string `json:"paired_region_id"`
	Creator           string `json:"creator"`
	Reviser           string `json:"reviser"`
	CreatedAt         string `json:"created_at"`
	UpdatedAt         string `json:"updated_at"`
}

// GetID ...
func (region AzureRegion) GetID() string {
	return region.ID
}

// GetCloudID ...
func (region AzureRegion) GetCloudID() string {
	return region.CloudID
}
