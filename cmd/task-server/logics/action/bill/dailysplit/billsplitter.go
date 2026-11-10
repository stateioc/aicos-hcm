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

package dailysplit

import (
	rawjson "encoding/json"
	"fmt"

	protocore "hcm/pkg/api/core/account-set"
	"hcm/pkg/api/data-service/bill"
	"hcm/pkg/criteria/enumor"
	"hcm/pkg/kit"
)

var vendorSplitterFunc = map[enumor.Vendor]func() RawBillSplitter{
	enumor.Aws:      func() RawBillSplitter { return &AwsSplitter{} },
	enumor.Gcp:      func() RawBillSplitter { return &GcpSplitter{} },
	enumor.HuaWei:   func() RawBillSplitter { return &DefaultSplitter{} },
	enumor.Azure:    func() RawBillSplitter { return &DefaultSplitter{} },
	enumor.Kaopu:    func() RawBillSplitter { return &DefaultSplitter{} },
	enumor.Zenlayer: func() RawBillSplitter { return &DefaultSplitter{} },
}

// GetSplitter ...
func GetSplitter(vendor enumor.Vendor) (RawBillSplitter, error) {
	if _, ok := vendorSplitterFunc[vendor]; ok {
		return vendorSplitterFunc[vendor](), nil
	}
	return nil, fmt.Errorf("unsupported vendor: %s for daily splitter", vendor)
}

// RawBillSplitter splitter for raw bill
type RawBillSplitter interface {
	DoSplit(kt *kit.Kit, opt *DailyAccountSplitActionOption, billDay int,
		item *bill.RawBillItem, mainAccount *protocore.BaseMainAccount) (
		[]bill.BillItemCreateReq[rawjson.RawMessage], error)
}

// DefaultSplitter default account splitter
type DefaultSplitter struct{}

// DoSplit implements RawBillSplitter
func (ds *DefaultSplitter) DoSplit(kt *kit.Kit, opt *DailyAccountSplitActionOption, billDay int,
	item *bill.RawBillItem, mainAccount *protocore.BaseMainAccount) ([]bill.BillItemCreateReq[rawjson.RawMessage],
	error) {

	data, err := item.Extension.MarshalJSON()
	if err != nil {
		return nil, fmt.Errorf("get extension value failed, err %s", err.Error())
	}
	var ext rawjson.RawMessage
	if err := rawjson.Unmarshal(data, &ext); err != nil {
		return nil, err
	}

	req := bill.BillItemCreateReq[rawjson.RawMessage]{
		RootAccountID: opt.RootAccountID,
		MainAccountID: opt.MainAccountID,
		Vendor:        opt.Vendor,
		ProductID:     mainAccount.OpProductID,
		BkBizID:       mainAccount.BkBizID,
		BillYear:      opt.BillYear,
		BillMonth:     opt.BillMonth,
		BillDay:       billDay,
		VersionID:     opt.VersionID,
		Currency:      item.BillCurrency,
		Cost:          item.BillCost,
		HcProductCode: item.HcProductCode,
		HcProductName: item.HcProductName,
		ResAmount:     item.ResAmount,
		ResAmountUnit: item.ResAmountUnit,
		Extension:     &ext,
	}
	return []bill.BillItemCreateReq[rawjson.RawMessage]{
		req,
	}, nil
}
