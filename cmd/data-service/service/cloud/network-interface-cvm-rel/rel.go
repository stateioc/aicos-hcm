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

package networkcvmrel

import (
	"net/http"

	"hcm/cmd/data-service/service/capability"
	"hcm/pkg/dal/dao"
	"hcm/pkg/rest"
)

// InitService ...
func InitService(cap *capability.Capability) {
	svc := &relSvc{
		dao: cap.Dao,
	}

	h := rest.NewHandler()
	h.Add("BatchCreateNetworkCvmRels", http.MethodPost, "/network_cvm_rels/batch/create", svc.BatchCreateNetworkCvmRels)
	h.Add("ListNetworkCvmRels", http.MethodPost, "/network_cvm_rels/list", svc.ListNetworkCvmRels)
	h.Add("ListWithExtension", http.MethodPost, "/vendors/{vendor}/network_cvm_rels/with/interfaces/list",
		svc.ListWithExtension)
	h.Add("BatchDeleteNetworkCvmRels", http.MethodDelete, "/network_cvm_rels/batch", svc.BatchDeleteNetworkCvmRels)

	h.Load(cap.WebService)
}

type relSvc struct {
	dao dao.Set
}
