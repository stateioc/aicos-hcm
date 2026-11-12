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

type Industry string

const (
	IndustryTelecommunication = "tc" // 电讯业
	IndustryComputing         = "cp" // 计算机
	IndustryInternet          = "it" // 因特网
)

var IndustryMap = map[Industry]string{
	IndustryTelecommunication: "电讯业",
	IndustryComputing:         "计算机",
	IndustryInternet:          "因特网",
}

var IndustryDescMap = map[string]Industry{}

func init() {
	for k, v := range IndustryMap {
		IndustryDescMap[v] = k
	}
}

func (i Industry) Desc() string {
	s, ok := IndustryMap[i]
	if !ok {
		return ""
	}
	return s
}

func GetIndustry(desc string) (Industry, error) {
	e, ok := IndustryDescMap[desc]
	if !ok {
		return "", fmt.Errorf("industry desc:%s is not found", desc)
	}
	return e, nil
}
