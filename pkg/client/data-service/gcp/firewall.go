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
	protocloud "hcm/pkg/api/data-service/cloud"
	"hcm/pkg/criteria/errf"
	"hcm/pkg/rest"
)

// NewFirewallClient create a new firewall rule api client.
func NewFirewallClient(client rest.ClientInterface) *FirewallClient {
	return &FirewallClient{
		client: client,
	}
}

// FirewallClient is data service firewall rule api client.
type FirewallClient struct {
	client rest.ClientInterface
}

// BatchCreateFirewallRule batch create firewall rule.
func (cli *FirewallClient) BatchCreateFirewallRule(ctx context.Context, h http.Header,
	request *protocloud.GcpFirewallRuleBatchCreateReq) (*core.BatchCreateResult, error) {

	resp := new(core.BatchCreateResp)

	err := cli.client.Post().
		WithContext(ctx).
		Body(request).
		SubResourcef("/firewalls/rules/batch/create").
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

// BatchUpdateFirewallRule batch update firewall rule.
func (cli *FirewallClient) BatchUpdateFirewallRule(ctx context.Context, h http.Header,
	request *protocloud.GcpFirewallRuleBatchUpdateReq) error {

	resp := new(rest.BaseResp)

	err := cli.client.Patch().
		WithContext(ctx).
		Body(request).
		SubResourcef("/firewalls/rules/batch/update").
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

// ListFirewallRule list gcp firewall rule.
func (cli *FirewallClient) ListFirewallRule(ctx context.Context, h http.Header, request *protocloud.
	GcpFirewallRuleListReq) (*protocloud.GcpFirewallRuleListResult, error) {

	resp := new(protocloud.GcpFirewallRuleListResp)

	err := cli.client.Post().
		WithContext(ctx).
		Body(request).
		SubResourcef("/firewalls/rules/list").
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

// BatchDeleteFirewallRule batch delete gcp firewall rule rule.
func (cli *FirewallClient) BatchDeleteFirewallRule(ctx context.Context, h http.Header,
	request *protocloud.GcpFirewallRuleBatchDeleteReq) error {

	resp := new(core.DeleteResp)

	err := cli.client.Delete().
		WithContext(ctx).
		Body(request).
		SubResourcef("/firewalls/rules/batch").
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
