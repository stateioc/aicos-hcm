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

// Package huawei ...
package huawei

import (
	ressync "hcm/cmd/hc-service/logics/res-sync"
	"hcm/cmd/hc-service/logics/res-sync/huawei"
	"hcm/pkg/api/hc-service/sync"
	"hcm/pkg/criteria/errf"
	"hcm/pkg/rest"
)

func defaultPrepare(cts *rest.Contexts, cli ressync.Interface) (*sync.HuaWeiSyncReq, huawei.Interface, error) {
	req := new(sync.HuaWeiSyncReq)
	if err := cts.DecodeInto(req); err != nil {
		return nil, nil, errf.NewFromErr(errf.DecodeRequestFailed, err)
	}

	if err := req.Validate(); err != nil {
		return nil, nil, errf.NewFromErr(errf.InvalidParameter, err)
	}

	syncCli, err := cli.HuaWei(cts.Kit, req.AccountID)
	if err != nil {
		return nil, nil, err
	}

	return req, syncCli, nil
}
