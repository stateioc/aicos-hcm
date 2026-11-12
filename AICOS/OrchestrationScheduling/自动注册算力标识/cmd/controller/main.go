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
	"register-power-resources/pkg/controller"

	"k8s.io/client-go/kubernetes"
	"k8s.io/client-go/rest"
)

func main() {
	fmt.Printf("[INfo]len(os.Args): %d\n", len(os.Args))
	fmt.Printf("[INfo]os.Args[0]: %s\n", os.Args[0])
	fmt.Printf("[INfo]os.Args[1]: %s\n", os.Args[1])

	if len(os.Args) < 2 {
		fmt.Println("Usage: controller <args>")
		fmt.Println("Args: register, print")
		return
	}

	// 获取当前集群的配置
	config, err := rest.InClusterConfig()
	if err != nil {
		panic(err.Error())
	}

	// 创建当前集群的 Kubernetes 客户端
	clientset, err := kubernetes.NewForConfig(config)
	if err != nil {
		panic(err.Error())
	}

	// 创建并启动 LabelWatcher
	labelWatcher := controller.NewLabelWatcher(clientset)
	go labelWatcher.Run()

	// 创建并启动 ConfigMapWatcher
	configMapWatcher := controller.NewConfigMapWatcher(clientset, labelWatcher)
	go configMapWatcher.Run()

	// 阻止主 goroutine 退出
	select {}
}
