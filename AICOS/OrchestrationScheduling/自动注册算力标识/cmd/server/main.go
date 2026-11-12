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
package main

import (
	"fmt"
	"github.com/gorilla/mux"
	"log"
	"net/http"
	"register-power-resources/pkg/server"
)

func main() {
	router := mux.NewRouter()
	router.HandleFunc("/resources", server.RegisterResource).Methods("POST")
	router.HandleFunc("/resources/{id}", server.UnregisterResource).Methods("DELETE")
	router.HandleFunc("/resources/{id}", server.GetResource).Methods("GET")
	router.HandleFunc("/resources", server.ListResources).Methods("GET")

	fmt.Println("Starting server at :8080")
	http.ListenAndServe(":8080", router)
	log.Fatal(http.ListenAndServe(":8080", router))
}
