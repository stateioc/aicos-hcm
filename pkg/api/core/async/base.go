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

package coreasync

import (
	"hcm/pkg/api/core"
	"hcm/pkg/criteria/enumor"
	tableasync "hcm/pkg/dal/table/async"
	"hcm/pkg/dal/table/types"
)

// AsyncFlow ...
type AsyncFlow struct {
	ID            string                `json:"id"`
	Name          enumor.FlowName       `json:"name"`
	State         enumor.FlowState      `json:"state"`
	Reason        *tableasync.Reason    `json:"reason"`
	ShareData     *tableasync.ShareData `json:"share_data"`
	Memo          string                `json:"memo"`
	Worker        *string               `json:"worker"`
	core.Revision `json:",inline"`
}

// AsyncFlowTask ...
type AsyncFlowTask struct {
	ID            string             `json:"id"`
	FlowID        string             `json:"flow_id"`
	FlowName      enumor.FlowName    `json:"flow_name"`
	ActionID      string             `json:"action_id"`
	ActionName    enumor.ActionName  `json:"action_name"`
	Params        types.JsonField    `json:"params"`
	Result        types.JsonField    `json:"result"`
	Retry         *tableasync.Retry  `json:"retry"`
	DependOn      types.StringArray  `json:"depend_on"`
	State         enumor.TaskState   `json:"state"`
	Reason        *tableasync.Reason `json:"reason"`
	core.Revision `json:",inline"`
}
