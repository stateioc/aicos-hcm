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

// Package assign ...
package assign

import (
	"hcm/pkg/criteria/enumor"
	"hcm/pkg/criteria/errf"
)

// AssignResourceToBizReq assign cloud resource to biz request.
type AssignResourceToBizReq struct {
	AccountID    string                     `json:"account_id"`
	BkBizID      int64                      `json:"bk_biz_id"`
	ResTypes     []enumor.CloudResourceType `json:"res_types"`
	IsAllResType bool                       `json:"is_all_res_type"`
}

// Validate AssignResourceToBizReq.
func (a AssignResourceToBizReq) Validate() error {
	if len(a.AccountID) == 0 {
		return errf.New(errf.InvalidParameter, "account id is required")
	}

	if a.BkBizID == 0 {
		return errf.New(errf.InvalidParameter, "biz id is required")
	}

	if !a.IsAllResType && len(a.ResTypes) == 0 {
		return errf.New(errf.InvalidParameter, "one of res_types and is_all_res_type must be set")
	}

	if a.IsAllResType && len(a.ResTypes) != 0 {
		return errf.New(errf.InvalidParameter, "only one of res_types and is_all_res_type can be set")
	}

	return nil
}
