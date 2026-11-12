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
	"encoding/json"
	"fmt"
	"github.com/gorilla/mux"
	"net/http"
	"register-power-resources/pkg/apis"
)

type RequestBody struct {
	ComputeIDs []string `json:"compute_ids"`
}

func RegisterResource(w http.ResponseWriter, r *http.Request) {

	decoder := json.NewDecoder(r.Body)
	var body RequestBody
	err := decoder.Decode(&body)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	for _, computeID := range body.ComputeIDs {
		resource := apis.ParseResourceInfo(computeID)
		registry.AddResource(resource)
		w.WriteHeader(http.StatusCreated)
		fmt.Println(computeID)
	}
}

func UnregisterResource(w http.ResponseWriter, r *http.Request) {
	id := mux.Vars(r)["id"]
	registry.DeleteResource(id)
	w.WriteHeader(http.StatusNoContent)
	//fmt.Println(registry.Resources)
}
