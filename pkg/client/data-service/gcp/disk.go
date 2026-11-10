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

	"hcm/pkg/api/core"
	coredisk "hcm/pkg/api/core/cloud/disk"
	dataproto "hcm/pkg/api/data-service/cloud/disk"
	"hcm/pkg/criteria/errf"
	"hcm/pkg/kit"
)

// BatchCreateDisk 批量创建云盘
func (rc *restClient) BatchCreateDisk(ctx context.Context,
	h http.Header,
	request *dataproto.DiskExtBatchCreateReq[coredisk.GcpExtension],
) (*core.BatchCreateResult, error) {
	resp := new(core.BatchCreateResp)
	err := rc.client.Post().
		WithContext(ctx).
		Body(request).
		SubResourcef("/disks/batch/create").
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

// RetrieveDisk 查询单个云盘详情
func (rc *restClient) RetrieveDisk(kt *kit.Kit, diskID string) (*coredisk.Disk[coredisk.GcpExtension], error) {
	resp := new(dataproto.GetResp[coredisk.GcpExtension])
	err := rc.client.Get().
		WithContext(kt.Ctx).
		SubResourcef("/disks/%s", diskID).
		WithHeaders(kt.Header()).
		Do().Into(resp)
	if err != nil {
		return nil, err
	}

	if resp.Code != errf.OK {
		return nil, errf.New(resp.Code, resp.Message)
	}

	return resp.Data, nil
}

// ListDisk 查询云盘列表(带 extension 字段)
func (rc *restClient) ListDisk(
	ctx context.Context,
	h http.Header,
	request *core.ListReq,
) (*dataproto.ListExtResult[coredisk.GcpExtension], error) {
	resp := new(dataproto.ListExtResp[coredisk.GcpExtension])
	err := rc.client.Post().WithContext(ctx).Body(request).SubResourcef("/disks/list").WithHeaders(h).Do().Into(resp)
	if err != nil {
		return nil, err
	}

	if resp.Code != errf.OK {
		return nil, errf.New(resp.Code, resp.Message)
	}

	return resp.Data, nil
}

// BatchUpdateDisk 批量更新云盘信息
func (rc *restClient) BatchUpdateDisk(
	ctx context.Context,
	h http.Header,
	request *dataproto.DiskExtBatchUpdateReq[coredisk.GcpExtension],
) (interface{}, error) {
	resp := new(core.UpdateResp)
	err := rc.client.Patch().WithContext(ctx).Body(request).SubResourcef("/disks").WithHeaders(h).Do().Into(resp)
	if err != nil {
		return nil, err
	}

	if resp.Code != errf.OK {
		return nil, errf.New(resp.Code, resp.Message)
	}

	return resp.Data, nil
}
