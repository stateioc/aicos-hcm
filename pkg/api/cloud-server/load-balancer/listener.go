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

package cslb

import (
	"fmt"

	"hcm/pkg/criteria/constant"
	"hcm/pkg/criteria/validator"
)

// DeleteListenerReq ...
type DeleteListenerReq struct {
	IDs       []string `json:"ids" validate:"min=1"`
	AccountID string   `json:"account_id" validate:"required"`
}

// Validate ...
func (req *DeleteListenerReq) Validate() error {
	if len(req.IDs) > constant.BatchOperateDeleteListenerLimit {
		return fmt.Errorf("delete listener ids count should <= %d", constant.BatchOperateDeleteListenerLimit)
	}
	return validator.Validate.Struct(req)
}
