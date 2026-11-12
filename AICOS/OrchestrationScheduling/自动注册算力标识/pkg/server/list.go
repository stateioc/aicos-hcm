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
package server

import (
	"fmt"
	"net/http"
	"register-power-resources/pkg/apis"
	"strconv"
	"strings"
)

func ListResources(w http.ResponseWriter, r *http.Request) {
	offset, _ := strconv.Atoi(r.URL.Query().Get("offset"))
	limit, _ := strconv.Atoi(r.URL.Query().Get("limit"))

	resources := registry.GetResources(offset, limit)

	var resourceStrings []string
	for _, resource := range resources {
		resourceStrings = append(resourceStrings, apis.ResourceInfoToString(resource))
	}

	fmt.Fprint(w, strings.Join(resourceStrings, "\n"))
}
