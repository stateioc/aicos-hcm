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

import (
	"fmt"
)

type Enterprise string

const (
	EnterpriseChinaTelecom = "2001" // 中国电信
	EnterpriseChinaMobile  = "2002" // 中国移动
	EnterpriseChinaUnion   = "2003" // 中国联通
	EnterpriseAliCloud     = "2004" // 阿里云
	EnterpriseTencentCloud = "2005" // 腾讯云
	EnterpriseHuaWeiCloud  = "2006" // 华为云
	EnterpriseUCloud       = "2007" // UCloud
	EnterpriseQingCloud    = "2008" // 青云
)

var EnterpriseMap = map[Enterprise]string{
	EnterpriseChinaTelecom: "中国电信",
	EnterpriseChinaMobile:  "中国移动",
	EnterpriseChinaUnion:   "中国联通",
	EnterpriseAliCloud:     "阿里云",
	EnterpriseTencentCloud: "腾讯云",
	EnterpriseHuaWeiCloud:  "华为云",
	EnterpriseUCloud:       "UCloud",
	EnterpriseQingCloud:    "青云",
}

var EnterpriseDescMap = map[string]Enterprise{}

func init() {
	for k, v := range EnterpriseMap {
		EnterpriseDescMap[v] = k
	}
}

func (e Enterprise) Desc() string {
	s, ok := EnterpriseMap[e]
	if !ok {
		return ""
	}
	return s
}

func GetEnterprise(desc string) (Enterprise, error) {
	e, ok := EnterpriseDescMap[desc]
	if !ok {
		return "", fmt.Errorf("enterprise desc:%s is not found", desc)
	}
	return e, nil
}
