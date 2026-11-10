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

package actbill

import (
	actcli "hcm/cmd/task-server/logics/action/cli"
	"hcm/pkg/cc"
	hcservice "hcm/pkg/client/hc-service"
	"hcm/pkg/criteria/constant"
	"hcm/pkg/criteria/enumor"
)

// GetHCServiceByAwsSite for aws account, use constant.AwsCNServiceLabel label for enumor.MainAccountChinaSite
func GetHCServiceByAwsSite(site enumor.RootAccountSiteType) *hcservice.Client {
	if !cc.TaskServer().UseLabel.AwsCN {
		return actcli.GetHCService()
	}
	var labels []string
	if site == enumor.MainAccountChinaSite {
		labels = []string{constant.AwsCNServiceLabel}
	}
	hcCli := actcli.GetHCService(labels...)
	return hcCli
}
