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
	"fmt"

	"hcm/pkg/criteria/constant"
	"hcm/pkg/criteria/validator"
)

// EipSyncReq eip sync request
type EipSyncReq struct {
	AccountID         string   `json:"account_id" validate:"required"`
	Region            string   `json:"region" validate:"omitempty"`
	ResourceGroupName string   `json:"resource_group_name" validate:"omitempty"`
	CloudIDs          []string `json:"cloud_ids" validate:"omitempty"`
}

// Validate eip sync request.
func (req *EipSyncReq) Validate() error {
	if len(req.CloudIDs) > constant.BatchOperationMaxLimit {
		return fmt.Errorf("operate sync count should <= %d", constant.BatchOperationMaxLimit)
	}

	return validator.Validate.Struct(req)
}

// EipDeleteReq ...
type EipDeleteReq struct {
	EipID string `json:"eip_id" validate:"required"`
}

// Validate ...
func (req *EipDeleteReq) Validate() error {
	return validator.Validate.Struct(req)
}
