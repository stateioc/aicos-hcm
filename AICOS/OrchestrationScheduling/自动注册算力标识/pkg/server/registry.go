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
	"register-power-resources/pkg/apis"
	"sync"
)

type Registry struct {
	sync.RWMutex
	Resources map[string]*apis.NodeResourceInfo
}

func (r *Registry) AddResource(resource *apis.NodeResourceInfo) {
	r.Lock()
	defer r.Unlock()
	r.Resources[resource.ID] = resource
}

func (r *Registry) DeleteResource(id string) {
	r.Lock()
	defer r.Unlock()
	delete(r.Resources, id)
}

func (r *Registry) GetResources(offset, limit int) []*apis.NodeResourceInfo {
	r.RLock()
	defer r.RUnlock()

	resources := make([]*apis.NodeResourceInfo, 0, 1000)
	for _, resource := range r.Resources {
		resources = append(resources, resource)
	}
	return resources
}

var registry = &Registry{
	Resources: make(map[string]*apis.NodeResourceInfo),
}
