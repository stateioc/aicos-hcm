// SPACE-AICOS is pleased to support the open source community by making
// SPACE-AICOS available.
// Copyright (C) 2026 China Academy of Information and Communications Technology (CAICT).
// All rights reserved.
// Licensed under the MIT License (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at http://opensource.org/licenses/MIT
// Unless required by applicable law or agreed to in writing,
// software distributed under the License is distributed on
// an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND,
// either express or implied. See the License for the
// specific language governing permissions and limitations under the License.
package definition

import "fmt"

type DataCenter string

const (
	DataCenterRegion1 = "501" // 可用区1
	DataCenterRegion2 = "502" // 可用区2
	DataCenterRegion3 = "503" // 可用区3
)

var DataCenterMap = map[DataCenter]string{
	DataCenterRegion1: "可用区1",
	DataCenterRegion2: "可用区2",
	DataCenterRegion3: "可用区3",
}

var DataCenterDescMap = map[string]DataCenter{}

func init() {
	for k, v := range DataCenterMap {
		DataCenterDescMap[v] = k
	}
}

func (dc DataCenter) Desc() string {
	s, ok := DataCenterMap[dc]
	if !ok {
		return ""
	}
	return s
}

func GetDataCenter(desc string) (DataCenter, error) {
	e, ok := DataCenterDescMap[desc]
	if !ok {
		return "", fmt.Errorf("data center desc:%s is not found", desc)
	}
	return e, nil
}
