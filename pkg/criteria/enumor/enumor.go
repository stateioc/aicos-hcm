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

// Package enumor ...
package enumor

// SecurityGroupRuleType is SecurityGroupRule type
type SecurityGroupRuleType string

const (
	// Egress is SecurityGroup egress rule.
	Egress SecurityGroupRuleType = "egress"
	// Ingress is SecurityGroup ingress rule.
	Ingress SecurityGroupRuleType = "ingress"
)

// RequestSourceType is request source type.
type RequestSourceType string

const (
	// ApiCall 来自前端和OpenApi调用的请求。
	ApiCall RequestSourceType = "api_call"
	// BackgroundSync 同步云上数据而发出的请求。
	BackgroundSync RequestSourceType = "background_sync"
	// AsynchronousTasks 异步任务请求，比如云的批量异步操作，会设置腾讯云接口调用的超限重试
	AsynchronousTasks RequestSourceType = "asynchronous_tasks"
)

// RequestSourceEnums request type map.
var RequestSourceEnums = map[RequestSourceType]bool{
	ApiCall:           true,
	BackgroundSync:    true,
	AsynchronousTasks: true,
}

// Exist judge enum value exist.
func (rs RequestSourceType) Exist() bool {
	_, exist := RequestSourceEnums[rs]
	return exist
}
