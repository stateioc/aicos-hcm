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

// Package globalconfig global config service
package globalconfig

import (
	"net/http"

	"hcm/cmd/data-service/service/capability"
	"hcm/pkg/dal/dao"
	"hcm/pkg/rest"
)

// InitService initial the service
func InitService(cap *capability.Capability) {
	svc := &service{
		dao: cap.Dao,
	}

	h := rest.NewHandler()

	// common api
	h.Add("ListGlobalConfigs", http.MethodPost, "/global_configs/list", svc.ListGlobalConfigs)
	h.Add("BatchCreateGlobalConfigs", http.MethodPost, "/global_configs/batch/create", svc.BatchCreateGlobalConfigs)
	h.Add("BatchUpdateGlobalConfigs", http.MethodPatch, "/global_configs/batch", svc.BatchUpdateGlobalConfigs)
	h.Add("BatchDeleteGlobalConfigs", http.MethodDelete, "/global_configs/batch", svc.BatchDeleteGlobalConfigs)

	h.Load(cap.WebService)
}

type service struct {
	dao dao.Set
}
