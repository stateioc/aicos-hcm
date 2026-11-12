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
	"reflect"
	"register-power-resources/pkg/apis"
	"strings"
)

func ListResources() {
	for _, config := range serverConfigs {
		if config.Type == "local" {
			resp, err := http.Get(config.ServerURL + "/resources")
			if err != nil {
				fmt.Println("Error listing resources:", err)
				return
			}
			defer resp.Body.Close()

			if resp.StatusCode != http.StatusOK {
				fmt.Println("Error listing resources: status code", resp.StatusCode)
				return
			}

			body, err := ioutil.ReadAll(resp.Body)
			if err != nil {
				fmt.Println("Error reading response body:", err)
				return
			}

			if len(string(body)) != 0 {
				fmt.Println("All Resources:")
				fmt.Println(string(body))

				nodeInfos := strings.Split(string(body), "\n")
				for _, node := range nodeInfos {
					fmt.Println("==================================================================================" +
						"===============================================")
					fmt.Println("Resource detail for " + node + ":")
					nodeInfo := apis.ParseResourceInfo(node)
					printStructFields(nodeInfo)
				}
			}
		}
	}
}

func printStructFields(obj interface{}) {
	value := reflect.ValueOf(obj)

	// 如果传入的对象是指针，获取指针指向的结构体值
	if value.Kind() == reflect.Ptr {
		value = value.Elem()
	}

	typ := value.Type()

	for i := 0; i < value.NumField(); i++ {
		fieldName := typ.Field(i).Name
		fieldValue := value.Field(i).Interface()
		fmt.Printf("%s: %v\n", fieldName, fieldValue)
	}
}
