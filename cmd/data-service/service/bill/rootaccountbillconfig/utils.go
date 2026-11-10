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

// Package rootaccountbillconfig ...
package rootaccountbillconfig

import (
	"encoding/json"

	tabletype "hcm/pkg/dal/table/types"
	"hcm/pkg/logs"
)

func convertArrToTableJSON(arr []string) (tabletype.JsonField, error) {
	if len(arr) == 0 {
		return "[]", nil
	}

	str, err := json.Marshal(arr)
	if err != nil {
		logs.Errorf("convert arr to table json, json.Marshal failed, arr: %v, err: %v", arr, err)
		return "[]", err
	}

	return tabletype.JsonField(str), nil
}
