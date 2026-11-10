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

package handlers

import (
	"hcm/pkg/api/core"
	corecvm "hcm/pkg/api/core/cloud/cvm"
	"hcm/pkg/criteria/enumor"
	"hcm/pkg/runtime/filter"
)

// ListCvm 查询主机列表
func (a *BaseApplicationHandler) ListCvm(
	vendor enumor.Vendor, accountID string, cloudCvmIDs []string,
) ([]corecvm.BaseCvm, error) {
	reqFilter := &filter.Expression{
		Op: filter.And,
		Rules: []filter.RuleFactory{
			filter.AtomRule{Field: "vendor", Op: filter.Equal.Factory(), Value: vendor},
			filter.AtomRule{Field: "account_id", Op: filter.Equal.Factory(), Value: accountID},
			filter.AtomRule{Field: "cloud_id", Op: filter.In.Factory(), Value: cloudCvmIDs},
		},
	}
	// 查询
	resp, err := a.Client.DataService().Global.Cvm.ListCvm(
		a.Cts.Kit,
		&core.ListReq{
			Filter: reqFilter,
			Page:   &core.BasePage{Count: false, Start: 0, Limit: uint(len(cloudCvmIDs))},
		},
	)
	if err != nil {
		return nil, err
	}

	return resp.Details, nil
}
