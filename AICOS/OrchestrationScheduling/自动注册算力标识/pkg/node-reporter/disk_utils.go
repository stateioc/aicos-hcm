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
package node_reporter

import (
	"fmt"
	"io/ioutil"
	"math"
	"strings"
	"syscall"
)

func getNodeDiskCapacity() (int, error) {
	mountInfo, err := ioutil.ReadFile("/host/proc/self/mounts")
	if err != nil {
		fmt.Printf("Error reading mount info: %v\n", err)
		return 0, err
	}

	mounts := strings.Split(string(mountInfo), "\n")

	var totalSize float64
	uniqueDisks := make(map[string]float64)

	for _, mount := range mounts {
		mountPoint := strings.Fields(mount)
		if len(mountPoint) == 0 {
			continue
		}

		// 过滤文件系统类型
		fsType := mountPoint[2]
		if fsType != "ext4" && fsType != "xfs" {
			continue
		}

		device := mountPoint[0]
		if _, ok := uniqueDisks[device]; ok {
			continue
		}

		var stat syscall.Statfs_t
		err := syscall.Statfs(mountPoint[1], &stat)
		if err != nil {
			fmt.Printf("Error getting stat for mount point %s: %v\n", mountPoint[1], err)
			continue
		}

		totalSizeGB := float64(stat.Blocks) * float64(stat.Bsize) / (1024 * 1024 * 1024)
		uniqueDisks[device] = totalSizeGB
		fmt.Printf("Mount point: %s, Total Size: %.2f GB\n", mountPoint[1], totalSizeGB)

		totalSize += totalSizeGB
	}

	fmt.Printf("Total Size of All Disks: %.2fGB, %2d GB\n", totalSize, int(math.Ceil(totalSize)))
	return int(math.Ceil(totalSize)), nil
}
