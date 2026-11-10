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

package recycle

import (
	"net/http"

	"hcm/cmd/cloud-server/service/capability"
	"hcm/pkg/client"
	"hcm/pkg/iam/auth"
	"hcm/pkg/rest"
)

// InitService initialize the recycle record service.
func InitService(c *capability.Capability) {
	svc := &svc{
		client:     c.ApiClient,
		authorizer: c.Authorizer,
	}

	h := rest.NewHandler()

	h.Add("ListRecycleRecord", http.MethodPost, "/recycle_records/list", svc.ListRecycleRecord)
	h.Add("ListBizRecycleRecord", http.MethodPost, "/bizs/{bk_biz_id}/recycle_records/list", svc.ListBizRecycleRecord)

	h.Load(c.WebService)
}

type svc struct {
	client     *client.ClientSet
	authorizer auth.Authorizer
}
