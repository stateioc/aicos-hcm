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

package cscert

import (
	"errors"
	"fmt"

	"hcm/pkg/criteria/constant"
	"hcm/pkg/criteria/validator"
)

// AssignCertToBizReq define assign cert to biz req.
type AssignCertToBizReq struct {
	BkBizID int64    `json:"bk_biz_id" validate:"required"`
	CertIDs []string `json:"cert_ids" validate:"required"`
}

// Validate assign cert to biz request.
func (req *AssignCertToBizReq) Validate() error {
	if err := validator.Validate.Struct(req); err != nil {
		return err
	}

	if req.BkBizID <= 0 {
		return errors.New("bk_biz_id should >= 0")
	}

	if len(req.CertIDs) == 0 {
		return errors.New("cert ids is required")
	}

	if len(req.CertIDs) > constant.BatchOperationMaxLimit {
		return fmt.Errorf("cert ids should <= %d", constant.BatchOperationMaxLimit)
	}

	return nil
}
