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

// Package billsyncrecord ...
package billsyncrecord

import (
	"hcm/cmd/data-service/service/capability"
	"hcm/pkg/dal/dao"
	"hcm/pkg/rest"
	"net/http"
)

// InitService initialize the bill adjustment item service
func InitService(cap *capability.Capability) {
	svc := &service{
		dao: cap.Dao,
	}
	h := rest.NewHandler()
	h.Add("CreateBillSyncRecord", http.MethodPost, "/bills/sync_records/create", svc.CreateBillSyncRecord)
	h.Add("DeleteBillSyncRecord", http.MethodDelete, "/bills/sync_records", svc.DeleteBillSyncRecord)
	h.Add("UpdateBillSyncRecord", http.MethodPut, "/bills/sync_records", svc.UpdateBillSyncRecord)
	h.Add("ListBillSyncRecord", http.MethodPost, "/bills/sync_records/list", svc.ListBillSyncRecord)

	h.Load(cap.WebService)
}

type service struct {
	dao dao.Set
}
