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

import (
	"hcm/pkg/adaptor/types/eip"
	"hcm/pkg/criteria/validator"
)

// GcpEipAssociateReq ...
type GcpEipAssociateReq struct {
	AccountID          string `json:"account_id" validate:"required"`
	CvmID              string `json:"cvm_id" validate:"required"`
	EipID              string `json:"eip_id" validate:"required"`
	NetworkInterfaceID string `json:"network_interface_id" validate:"required"`
}

// Validate ...
func (req *GcpEipAssociateReq) Validate() error {
	return validator.Validate.Struct(req)
}

// GcpEipDisassociateReq ...
type GcpEipDisassociateReq struct {
	AccountID          string `json:"account_id" validate:"required"`
	CvmID              string `json:"cvm_id" validate:"required"`
	EipID              string `json:"eip_id" validate:"required"`
	NetworkInterfaceID string `json:"network_interface_id" validate:"required"`
}

// Validate ...
func (req *GcpEipDisassociateReq) Validate() error {
	return validator.Validate.Struct(req)
}

// GcpEipCreateReq ...
type GcpEipCreateReq struct {
	AccountID string `json:"account_id" validate:"required"`
	BkBizID   int64  `json:"bk_biz_id" validate:"required"`
	*eip.GcpEipCreateOption
}

// Validate ...
func (req *GcpEipCreateReq) Validate() error {
	return validator.Validate.Struct(req)
}
