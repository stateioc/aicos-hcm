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
	"hcm/pkg/criteria/validator"

	cvm "github.com/tencentcloud/tencentcloud-sdk-go/tencentcloud/cvm/v20170312"
)

// -------------------------- List --------------------------

// TCloudInstanceTypeListOption ...
type TCloudInstanceTypeListOption struct {
	Region             string `json:"region" validate:"required"`
	Zone               string `json:"zone" validate:"required"`
	InstanceChargeType string `json:"instance_charge_type" validate:"required"`
}

// Validate operation option.
func (opt TCloudInstanceTypeListOption) Validate() error {
	return validator.Validate.Struct(opt)
}

// TCloudInstanceType ...
type TCloudInstanceType struct {
	InstanceType      string
	InstanceFamily    string
	GPU               int64
	CPU               int64
	Memory            int64
	FPGA              int64
	Status            string
	CpuType           string
	InstanceBandwidth float64
	InstancePps       int64
	Price             cvm.ItemPrice
	TypeName          string
}
