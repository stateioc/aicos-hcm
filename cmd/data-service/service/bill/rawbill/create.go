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

package rawbill

import (
	"hcm/pkg/api/core"
	dsbill "hcm/pkg/api/data-service/bill"
	"hcm/pkg/criteria/errf"
	"hcm/pkg/rest"
)

// CreateRawBill create cloud raw bill
func (s *service) CreateRawBill(cts *rest.Contexts) (interface{}, error) {
	req := new(dsbill.RawBillCreateReq)
	if err := cts.DecodeInto(req); err != nil {
		return nil, errf.NewFromErr(errf.DecodeRequestFailed, err)
	}
	if err := req.Validate(); err != nil {
		return nil, errf.NewFromErr(errf.InvalidParameter, err)
	}
	uploadPath := generateFilePath(req.RawBillPathParam)
	buffer, err := generateCSV(req.Items)
	if err != nil {
		return nil, errf.NewFromErr(errf.InvalidParameter, err)
	}
	if err := s.ostore.Upload(cts.Kit, uploadPath, buffer); err != nil {
		return nil, errf.NewFromErr(errf.Aborted, err)
	}
	return &core.CreateResult{}, nil
}
