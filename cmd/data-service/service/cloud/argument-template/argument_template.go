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

// Package argstpl 参数模版的DB接口
package argstpl

import (
	"net/http"

	"hcm/cmd/data-service/service/capability"
	"hcm/pkg/dal/dao"
	"hcm/pkg/rest"
)

var svc *argsTplSvc

// InitService initial the argument template service
func InitService(cap *capability.Capability) {
	svc = &argsTplSvc{
		dao: cap.Dao,
	}

	h := rest.NewHandler()

	h.Add("ListArgsTpl", http.MethodPost, "/argument_templates/list", svc.ListArgsTpl)
	h.Add("ListArgsTplExt", http.MethodPost, "/vendors/{vendor}/argument_templates/list", svc.ListArgsTplExt)
	h.Add("CreateArgsTpl", http.MethodPost, "/vendors/{vendor}/argument_templates/create", svc.CreateArgsTpl)
	h.Add("BatchUpdateArgsTpl", http.MethodPut, "/argument_templates", svc.BatchUpdateArgsTpl)
	h.Add("BatchDeleteArgsTpl", http.MethodDelete, "/argument_templates/batch", svc.BatchDeleteArgsTpl)

	h.Load(cap.WebService)
}

type argsTplSvc struct {
	dao dao.Set
}
