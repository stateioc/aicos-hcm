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

package azure

import (
	"context"
	"net/http"

	"hcm/pkg/api/core"
	"hcm/pkg/api/hc-service/region"
	"hcm/pkg/criteria/errf"
	"hcm/pkg/rest"
)

// NewRegionClient create a new zone api client.
func NewRegionClient(client rest.ClientInterface) *RegionClient {
	return &RegionClient{
		client: client,
	}
}

// RegionClient is hc service region api client.
type RegionClient struct {
	client rest.ClientInterface
}

// SyncRegion sync zone.
func (cli *RegionClient) SyncRegion(ctx context.Context, h http.Header,
	request *region.AzureRegionSyncReq) error {

	resp := new(core.SyncResp)

	err := cli.client.Post().
		WithContext(ctx).
		Body(request).
		SubResourcef("/regions/sync").
		WithHeaders(h).
		Do().
		Into(resp)
	if err != nil {
		return err
	}

	if resp.Code != errf.OK {
		return errf.New(resp.Code, resp.Message)
	}

	return nil
}
