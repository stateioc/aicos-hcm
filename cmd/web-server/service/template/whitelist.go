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

package template

import "fmt"

var templateNameWhiteList = map[string]struct{}{}

func init() {
	registerTemplateFilenameToWhiteList("1_hcm_clb_tcp_udp_listener_template.xlsx")
	registerTemplateFilenameToWhiteList("2_hcm_clb_http_https_listener_template.xlsx")
	registerTemplateFilenameToWhiteList("3_hcm_clb_url_rule_template.xlsx")
	registerTemplateFilenameToWhiteList("4_hcm_clb_bind_rs_tcp_udp_template.xlsx")
	registerTemplateFilenameToWhiteList("5_hcm_clb_bind_rs_http_https_template.xlsx")
}

func registerTemplateFilenameToWhiteList(filename string) {
	templateNameWhiteList[filename] = struct{}{}
}

func validateTemplateFilename(filename string) error {
	_, ok := templateNameWhiteList[filename]
	if !ok {
		return fmt.Errorf("file(%s) unsupported to download", filename)
	}
	return nil
}
