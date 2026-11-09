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

package routetable

import "hcm/pkg/criteria/validator"

// RouteUpdateReq defines update route request.
type RouteUpdateReq struct {
	Memo *string `json:"memo" validate:"omitempty"`
}

// Validate RouteUpdateReq.
func (u *RouteUpdateReq) Validate() error {
	return validator.Validate.Struct(u)
}

// RouteDeleteReq delete route request.
type RouteDeleteReq struct {
	RouteID      string `json:"route_id" validate:"required"`
	RouteTableID string `json:"route_table_id" validate:"required"`
}
