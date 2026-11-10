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

// Package hcargstpl ...
package hcargstpl

import (
	"fmt"

	"hcm/pkg/api/core/cloud/argument-template"
	"hcm/pkg/criteria/constant"
	"hcm/pkg/criteria/validator"
	"hcm/pkg/rest"
)

// ArgstplSyncReq argument template sync request
type ArgstplSyncReq struct {
	AccountID string   `json:"account_id" validate:"required"`
	Region    string   `json:"region" validate:"omitempty"`
	CloudIDs  []string `json:"cloud_ids" validate:"omitempty"`
}

// Validate argument template sync request.
func (req *ArgstplSyncReq) Validate() error {
	if len(req.CloudIDs) > constant.BatchOperationMaxLimit {
		return fmt.Errorf("operate sync count should <= %d", constant.BatchOperationMaxLimit)
	}

	return validator.Validate.Struct(req)
}

// BatchCreateResp ...
type BatchCreateResp struct {
	rest.BaseResp `json:",inline"`
	Data          *argstpl.ArgsTplCreateResult `json:"data"`
}
