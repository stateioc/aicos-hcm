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

package monthtask

import (
	rawjson "encoding/json"
	"fmt"

	"hcm/pkg/api/data-service/bill"
	"hcm/pkg/criteria/enumor"
	"hcm/pkg/kit"
)

// GetRunner return month task vendor runner
func GetRunner(vendor enumor.Vendor, taskType enumor.MonthTaskType) (MonthTaskRunner, error) {
	switch vendor {
	case enumor.Gcp:
		return newGcpRunner(taskType)
	case enumor.Aws:
		return newAwsRunner(taskType)
	case enumor.HuaWei:
		return newHuaweiRunner(taskType)
	default:
		return nil, fmt.Errorf("vendor %s not support now", vendor)
	}
}

// MonthTaskRunner ...
type MonthTaskRunner interface {
	GetBatchSize(kt *kit.Kit) uint64
	Pull(kt *kit.Kit, opt *MonthTaskActionOption, index uint64) (
		itemList []bill.RawBillItem, isFinished bool, err error)
	Split(kt *kit.Kit, opt *MonthTaskActionOption, rawItemList []*bill.RawBillItem) (
		[]bill.BillItemCreateReq[rawjson.RawMessage], error)

	// GetHcProductCodes return all hc product codes for this month task type
	GetHcProductCodes() []string
}
