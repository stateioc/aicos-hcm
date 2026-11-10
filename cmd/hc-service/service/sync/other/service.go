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

// Package other ...
package other

import (
	cloudadaptor "hcm/cmd/hc-service/logics/cloud-adaptor"
	ressync "hcm/cmd/hc-service/logics/res-sync"
	"hcm/cmd/hc-service/service/capability"
	"hcm/pkg/client"
	dataservice "hcm/pkg/client/data-service"
	"hcm/pkg/rest"
)

// InitService initial other sync service
func InitService(cap *capability.Capability) {
	v := &service{
		ad:      cap.CloudAdaptor,
		cs:      cap.ClientSet,
		dataCli: cap.ClientSet.DataService(),
		syncCli: cap.ResSyncCli,
	}

	h := rest.NewHandler()
	h.Path("/vendors/other")

	h.Add("SyncHostWithRelRes", "POST", "/hosts/with/relation_resources/sync", v.SyncHostWithRelRes)
	h.Add("SyncHostWithRelResByCond", "POST", "/hosts/with/relation_resources/by_condition/sync",
		v.SyncHostWithRelResByCond)
	h.Add("DeleteHost", "DELETE", "/hosts/by_condition/delete", v.DeleteHostByCond)

	h.Load(cap.WebService)
}

type service struct {
	ad      *cloudadaptor.CloudAdaptorClient
	cs      *client.ClientSet
	dataCli *dataservice.Client
	syncCli ressync.Interface
}
