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
	"context"
	"net/http"

	"hcm/pkg/api/core"
	dataproto "hcm/pkg/api/data-service/cloud/eip"
	"hcm/pkg/criteria/errf"
)

// BatchCreateEip 批量创建 eip
func (rc *restClient) BatchCreateEip(ctx context.Context,
	h http.Header,
	request *dataproto.EipExtBatchCreateReq[dataproto.AwsEipExtensionCreateReq],
) (*core.BatchCreateResult, error) {
	resp := new(core.BatchCreateResp)
	err := rc.client.Post().
		WithContext(ctx).
		Body(request).
		SubResourcef("/eips/batch/create").
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

// RetrieveEip 查询单个 eip 详情
func (rc *restClient) RetrieveEip(
	ctx context.Context,
	h http.Header,
	eipID string,
) (*dataproto.EipExtResult[dataproto.AwsEipExtensionResult], error) {
	resp := new(dataproto.EipExtRetrieveResp[dataproto.AwsEipExtensionResult])
	err := rc.client.Get().WithContext(ctx).SubResourcef("/eips/%s", eipID).WithHeaders(h).Do().Into(resp)
	if err != nil {
		return nil, err
	}

	if resp.Code != errf.OK {
		return nil, errf.New(resp.Code, resp.Message)
	}

	return resp.Data, nil
}

// ListEip 查询 eip 列表(带 extension 字段)
func (rc *restClient) ListEip(
	ctx context.Context,
	h http.Header,
	request *dataproto.EipListReq,
) (*dataproto.EipExtListResult[dataproto.AwsEipExtensionResult], error) {
	resp := new(dataproto.EipExtListResp[dataproto.AwsEipExtensionResult])
	err := rc.client.Post().WithContext(ctx).Body(request).SubResourcef("/eips/list").WithHeaders(h).Do().Into(resp)
	if err != nil {
		return nil, err
	}

	if resp.Code != errf.OK {
		return nil, errf.New(resp.Code, resp.Message)
	}

	return resp.Data, nil
}

// BatchUpdateEip 批量更新 eip 信息
func (rc *restClient) BatchUpdateEip(
	ctx context.Context,
	h http.Header,
	request *dataproto.EipExtBatchUpdateReq[dataproto.AwsEipExtensionUpdateReq],
) (interface{}, error) {
	resp := new(core.UpdateResp)
	err := rc.client.Patch().WithContext(ctx).Body(request).SubResourcef("/eips").WithHeaders(h).Do().Into(resp)
	if err != nil {
		return nil, err
	}

	if resp.Code != errf.OK {
		return nil, errf.New(resp.Code, resp.Message)
	}

	return resp.Data, nil
}
