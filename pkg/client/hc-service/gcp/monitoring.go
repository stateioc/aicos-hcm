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

	typesMonitoring "hcm/pkg/adaptor/types/monitoring"
	protomonitoring "hcm/pkg/api/hc-service/monitoring"
	"hcm/pkg/criteria/errf"
	"hcm/pkg/rest"
)

// MonitoringClient is hc service monitoring api client.
type MonitoringClient struct {
	client rest.ClientInterface
}

// NewMonitoringClient create a new monitoring api client.
func NewMonitoringClient(client rest.ClientInterface) *MonitoringClient {
	return &MonitoringClient{
		client: client,
	}
}

// ListTimeSeries lists GCP Cloud Monitoring time series data.
func (m *MonitoringClient) ListTimeSeries(ctx context.Context, h http.Header,
	req *protomonitoring.GcpListTimeSeriesReq) (*typesMonitoring.GcpListTimeSeriesResult, error) {

	resp := new(protomonitoring.GcpListTimeSeriesResp)

	err := m.client.Post().
		WithContext(ctx).
		Body(req).
		SubResourcef("/monitoring/time_series/list").
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
