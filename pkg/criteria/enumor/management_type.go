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

package enumor

import "fmt"

// MgmtType 管理类型 management type
type MgmtType string

// Validate ...
func (m MgmtType) Validate() error {
	switch m {
	case MgmtTypeBiz, MgmtTypePlatform:
		return nil
	default:
		return fmt.Errorf("invalid management type: %s", m)
	}
}

func (m MgmtType) String() string {
	return string(m)
}

const (
	// MgmtTypeBiz 业务管理 managed by biz
	MgmtTypeBiz MgmtType = "biz"
	// MgmtTypePlatform 平台管理 managed by platform
	MgmtTypePlatform MgmtType = "platform"
)
