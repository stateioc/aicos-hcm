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
	"os"
	"time"

	"k8s.io/client-go/kubernetes"
	"k8s.io/client-go/rest"
	"register-power-resources/pkg/node-reporter"
)

func main() {
	config, err := rest.InClusterConfig()
	if err != nil {
		fmt.Printf("Error getting in cluster config: %v\n", err)
		os.Exit(1)
	}

	clientset, err := kubernetes.NewForConfig(config)
	if err != nil {
		fmt.Printf("Error getting clientset: %v\n", err)
		os.Exit(1)
	}

	nodeName := os.Getenv("NODE_NAME")
	if nodeName == "" {
		fmt.Println("NODE_NAME environment variable is not set")
		os.Exit(1)
	}

	reporter := node_reporter.NewNodeReporter(clientset, nodeName)

	for {
		if err := reporter.UpdateNodeLabels(); err != nil {
			fmt.Printf("Error updating node labels: %v\n", err)
			continue
		}

		fmt.Println("Successfully added labels to the node")

		// 每隔1分钟更新一次节点标签
		time.Sleep(1 * time.Minute)
	}
}
