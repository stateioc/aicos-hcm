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

package instancetype

import (
	adcore "hcm/pkg/adaptor/types/core"
)

// AwsInstanceTypeListOption ...
type AwsInstanceTypeListOption struct {
	Region string
	Page   *adcore.AwsPage
}

// AwsInstanceTypeListResult ...
type AwsInstanceTypeListResult struct {
	Details   []*AwsInstanceType
	NextToken *string
}

// AwsInstanceType ...
type AwsInstanceType struct {
	InstanceFamily     string
	InstanceType       string
	Memory             int64
	CPU                int64
	GPU                int64
	FPGA               int64
	NetworkPerformance string
	DiskSizeInGB       int64
	DiskType           string
	Architecture       string
}
