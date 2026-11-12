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

type Area string

const (
	AreaBeijing      = "1101" // 北京
	AreaTianjin      = "1201" // 天津
	AreaShijiazhuang = "1301" // 石家庄
	AreaShangHai     = "3101" // 上海
	AreaHangzhou     = "3301" // 杭州
	AreaGuangzhou    = "4401" // 广州

)

var AreaMap = map[Area]string{
	AreaBeijing:      "北京",
	AreaTianjin:      "天津",
	AreaShijiazhuang: "石家庄",
	AreaShangHai:     "上海",
	AreaHangzhou:     "杭州",
	AreaGuangzhou:    "广州",
}

var AreaDescMap = map[string]Area{}

func init() {
	for k, v := range AreaMap {
		AreaDescMap[v] = k
	}
}

func (a Area) Desc() string {
	s, ok := AreaMap[a]
	if !ok {
		return ""
	}
	return s
}

func GetArea(desc string) (Area, error) {
	e, ok := AreaDescMap[desc]
	if !ok {
		return "", fmt.Errorf("area desc:%s is not found", desc)
	}
	return e, nil
}
