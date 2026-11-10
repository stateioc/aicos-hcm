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

package cloud

import "hcm/pkg/api/core"

// VpcSecurityGroupRel define vpc security group rel.
type VpcSecurityGroupRel struct {
	ID              uint64                `json:"id"`
	VpcID           string                `json:"vpc_id"`
	SecurityGroupID string                `json:"security_group_id"`
	Revision        *core.CreatedRevision `json:"revision"`
}
