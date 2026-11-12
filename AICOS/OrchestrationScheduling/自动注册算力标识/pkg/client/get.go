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
package client

import (
	"fmt"
	"io/ioutil"
	"net/http"
)

func GetResource(id string) {
	for _, config := range serverConfigs {
		if config.Type == "local" {
			resp, err := http.Get(config.ServerURL + "/resources/" + id)
			if err != nil {
				fmt.Println("Error getting resource:", err)
				return
			}
			defer resp.Body.Close()

			if resp.StatusCode != http.StatusOK {
				fmt.Println("Error getting resource: status code", resp.StatusCode)
				return
			}

			body, err := ioutil.ReadAll(resp.Body)
			if err != nil {
				fmt.Println("Error reading response body:", err)
				return
			}

			fmt.Println("Resource:", string(body))
		}
	}

}
