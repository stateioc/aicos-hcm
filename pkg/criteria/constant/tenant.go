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

// Package constant constant 多租户相关的常量
package constant

const (
	// DefaultTenantID 默认的租户id，使用场景：兼容不开启多租户的场景，上下游调用默认传递default租户
	DefaultTenantID = "default"
	// SystemTenantID 运营租户id
	SystemTenantID = "system"
	// TenantIDField 租户id字段
	TenantIDField = "tenant_id"
	// TenantIDTableField 租户id对应的table里的字段
	TenantIDTableField = "TenantID"
)
