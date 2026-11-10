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

package gcp

import (
	"context"
	"net/http"

	coredisk "hcm/pkg/api/core/cloud/disk"
	datarelproto "hcm/pkg/api/data-service/cloud"
	"hcm/pkg/criteria/errf"
)

// ListDiskCvmRelWithDisk ...
func (rc *restClient) ListDiskCvmRelWithDisk(ctx context.Context,
	h http.Header,
	request *datarelproto.DiskCvmRelWithDiskListReq,
) ([]*datarelproto.DiskExtWithCvmID[coredisk.GcpExtension], error) {
	resp := new(datarelproto.DiskCvmRelWithDiskExtListResp[coredisk.GcpExtension])
	err := rc.client.Post().
		WithContext(ctx).
		Body(request).
		SubResourcef("/disk_cvm_rels/with/disks/list").
		WithHeaders(h).
		Do().
		Into(resp)
	if err != nil {
		return nil, err
	}

	if resp.Code != errf.OK {
		return nil, errf.New(resp.Code, resp.Message)
	}

	return resp.Data, nil
}
