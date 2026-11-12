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

type ResourceType string

const (
	ResourceTypeHpc = "01" // 超级计算
	ResourceTypeIc  = "02" // 智能计算
	ResourceTypeGc  = "03" // 通用计算
)

var ResourceTypeMap = map[ResourceType]string{
	ResourceTypeHpc: "超算",
	ResourceTypeIc:  "智算",
	ResourceTypeGc:  "通用",
}

var ResourceTypeDescMap = map[string]ResourceType{}

func init() {
	for k, v := range ResourceTypeMap {
		ResourceTypeDescMap[v] = k
	}
}

func (rt ResourceType) Desc() string {
	s, ok := ResourceTypeMap[rt]
	if !ok {
		return ""
	}
	return s
}

func GetResourceType(desc string) (ResourceType, error) {
	e, ok := ResourceTypeDescMap[desc]
	if !ok {
		return "", fmt.Errorf("resource type desc:%s is not found", desc)
	}
	return e, nil
}
