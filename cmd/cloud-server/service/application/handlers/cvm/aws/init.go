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

package aws

import (
	"hcm/cmd/cloud-server/service/application/handlers"
	"hcm/cmd/cloud-server/service/common"
	proto "hcm/pkg/api/cloud-server/cvm"
	hcproto "hcm/pkg/api/hc-service/cvm"
	"hcm/pkg/criteria/enumor"
)

// ApplicationOfCreateAwsCvm ...
type ApplicationOfCreateAwsCvm struct {
	handlers.BaseApplicationHandler

	req *proto.AwsCvmCreateReq
}

// NewApplicationOfCreateAwsCvm ...
func NewApplicationOfCreateAwsCvm(
	opt *handlers.HandlerOption, req *proto.AwsCvmCreateReq,
) *ApplicationOfCreateAwsCvm {
	return &ApplicationOfCreateAwsCvm{
		BaseApplicationHandler: handlers.NewBaseApplicationHandler(opt, enumor.CreateCvm, enumor.Aws),
		req:                    req,
	}
}

func (a *ApplicationOfCreateAwsCvm) toHcProtoAwsBatchCreateReq(dryRun bool) *hcproto.AwsBatchCreateReq {
	createReq := common.ConvAwsCvmCreateReq(a.req)
	createReq.DryRun = dryRun

	return createReq
}
