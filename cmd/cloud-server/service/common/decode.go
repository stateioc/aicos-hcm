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

package common

import (
	rawjson "encoding/json"

	"hcm/pkg/criteria/errf"
	"hcm/pkg/kit"
	"hcm/pkg/logs"
	"hcm/pkg/tools/json"
)

// DecodeExtension decode extension from raw json extension.
func DecodeExtension(kt *kit.Kit, rawExtension rawjson.RawMessage, extension interface{}) error {
	err := json.Unmarshal(rawExtension, &extension)
	if err != nil {
		logs.ErrorDepthf(1, "decode extension from request body failed, err: %s, rid: %s", err.Error(), kt.Rid)
		return errf.NewFromErr(errf.InvalidParameter, err)
	}
	return nil
}
