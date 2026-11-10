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

package billsyncrecord

import (
	"net/http"

	"hcm/cmd/account-server/logics/audit"
	"hcm/cmd/account-server/service/capability"
	"hcm/pkg/client"
	"hcm/pkg/iam/auth"
	"hcm/pkg/rest"
)

// InitService initial the main account service
func InitService(c *capability.Capability) {
	svc := &service{
		client:     c.ApiClient,
		authorizer: c.Authorizer,
		audit:      c.Audit,
	}

	h := rest.NewHandler()

	// register handler
	h.Add("ListSyncRecord", http.MethodPost, "/bills/sync_records/list", svc.ListSyncRecord)
	h.Add("CreateSyncRecord",
		http.MethodPost, "/bills/sync_records", svc.CreateSyncRecord)

	h.Load(c.WebService)
}

type service struct {
	client     *client.ClientSet
	authorizer auth.Authorizer
	audit      audit.Interface
}