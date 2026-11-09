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

package eip

// GcpEipExtensionCreateReq ...
type GcpEipExtensionCreateReq struct {
	AddressType  string   `json:"address_type"`
	Description  string   `json:"description"`
	IpVersion    string   `json:"ip_version"`
	NetworkTier  string   `json:"network_tier"`
	PrefixLength int64    `json:"prefix_length"`
	Purpose      string   `json:"purpose"`
	Network      string   `json:"network"`
	Subnetwork   string   `json:"subnetwork"`
	SelfLink     string   `json:"self_link"`
	Users        []string `json:"users"`
}

// GcpEipExtensionResult ...
type GcpEipExtensionResult struct {
	AddressType  string   `json:"address_type"`
	Description  string   `json:"description"`
	IpVersion    string   `json:"ip_version"`
	NetworkTier  string   `json:"network_tier"`
	PrefixLength int64    `json:"prefix_length"`
	Purpose      string   `json:"purpose"`
	Network      string   `json:"network"`
	Subnetwork   string   `json:"subnetwork"`
	SelfLink     string   `json:"self_link"`
	Users        []string `json:"users"`
}

// GcpEipExtensionUpdateReq ...
type GcpEipExtensionUpdateReq struct {
	AddressType  string   `json:"address_type"`
	Description  string   `json:"description"`
	IpVersion    string   `json:"ip_version"`
	NetworkTier  string   `json:"network_tier"`
	PrefixLength int64    `json:"prefix_length"`
	Purpose      string   `json:"purpose"`
	Network      string   `json:"network"`
	Subnetwork   string   `json:"subnetwork"`
	SelfLink     string   `json:"self_link"`
	Users        []string `json:"users"`
}
