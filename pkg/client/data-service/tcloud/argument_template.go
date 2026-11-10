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

package tcloud

import (
	"hcm/pkg/api/core"
	coreargstpl "hcm/pkg/api/core/cloud/argument-template"
	protocloud "hcm/pkg/api/data-service/cloud"
	"hcm/pkg/client/common"
	"hcm/pkg/kit"
	"hcm/pkg/rest"
)

// BatchCreateArgsTpl batch create argument template.
func (rc *restClient) BatchCreateArgsTpl(kt *kit.Kit,
	request *protocloud.ArgsTplBatchCreateReq[coreargstpl.TCloudArgsTplExtension]) (*core.BatchCreateResult, error) {

	return common.Request[protocloud.ArgsTplBatchCreateReq[coreargstpl.TCloudArgsTplExtension], core.BatchCreateResult](
		rc.client, rest.POST, kt, request,
		"/argument_templates/create")
}

// ListArgsTplExt list argument template.
func (rc *restClient) ListArgsTplExt(kt *kit.Kit, request *core.ListReq) (
	*protocloud.ArgsTplExtListResult[coreargstpl.TCloudArgsTplExtension], error) {

	return common.Request[core.ListReq, protocloud.ArgsTplExtListResult[coreargstpl.TCloudArgsTplExtension]](
		rc.client, rest.POST, kt, request, "/argument_templates/list")
}
