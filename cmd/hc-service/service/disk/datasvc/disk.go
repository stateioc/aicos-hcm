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

package datasvc

import (
	dataproto "hcm/pkg/api/data-service/cloud/disk"
	dataservice "hcm/pkg/client/data-service"
	"hcm/pkg/kit"
	"hcm/pkg/runtime/filter"
)

// DiskManager ...
type DiskManager struct {
	DataCli *dataservice.Client
}

// Delete ...
func (m *DiskManager) Delete(kt *kit.Kit, diskIDs []string) error {
	req := &dataproto.DiskDeleteReq{
		Filter: &filter.Expression{
			Op: filter.And,
			Rules: []filter.RuleFactory{
				&filter.AtomRule{
					Field: "id",
					Op:    filter.In.Factory(),
					Value: diskIDs,
				},
			},
		},
	}
	_, err := m.DataCli.Global.DeleteDisk(kt.Ctx, kt.Header(), req)
	return err
}
