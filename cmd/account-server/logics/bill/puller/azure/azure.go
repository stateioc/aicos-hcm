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

// Package azure bill puller Option
package azure

import (
	"hcm/cmd/account-server/logics/bill/puller"
	"hcm/cmd/account-server/logics/bill/puller/daily"
	"hcm/pkg/api/data-service/bill"
	dsbillapi "hcm/pkg/api/data-service/bill"
	"hcm/pkg/client"
	"hcm/pkg/criteria/enumor"
	"hcm/pkg/kit"
)

const (
	defaultAzureDelay = 1
)

func init() {
	puller.DailyPullerRegistry[enumor.Azure] = &AzurePuller{
		BillDelay: defaultAzureDelay,
	}

}

// AzurePuller huawei puller
type AzurePuller struct {
	BillDelay int
}

// EnsurePullTask ...
func (hp *AzurePuller) EnsurePullTask(kt *kit.Kit, client *client.ClientSet, billSummaryMain *dsbillapi.BillSummaryMain,
	defaultCurrency enumor.CurrencyCode) error {

	dp := &daily.DailyPuller{
		RootAccountID:      billSummaryMain.RootAccountID,
		RootAccountCloudID: billSummaryMain.RootAccountCloudID,
		MainAccountID:      billSummaryMain.MainAccountID,
		MainAccountCloudID: billSummaryMain.MainAccountCloudID,
		ProductID:          billSummaryMain.ProductID,
		BkBizID:            billSummaryMain.BkBizID,
		Vendor:             billSummaryMain.Vendor,
		BillYear:           billSummaryMain.BillYear,
		BillMonth:          billSummaryMain.BillMonth,
		Version:            billSummaryMain.CurrentVersion,
		BillDelay:          hp.BillDelay,
		Client:             client,
		DefaultCurrency:    defaultCurrency,
	}
	return dp.EnsurePullTask(kt)
}

// GetPullTaskList ...
func (hp *AzurePuller) GetPullTaskList(kt *kit.Kit, client *client.ClientSet,
	billSummaryMain *dsbillapi.BillSummaryMain) (
	[]*bill.BillDailyPullTaskResult, error) {

	dp := &daily.DailyPuller{
		RootAccountID: billSummaryMain.RootAccountID,
		MainAccountID: billSummaryMain.MainAccountID,
		ProductID:     billSummaryMain.ProductID,
		BkBizID:       billSummaryMain.BkBizID,
		Vendor:        billSummaryMain.Vendor,
		BillYear:      billSummaryMain.BillYear,
		BillMonth:     billSummaryMain.BillMonth,
		Version:       billSummaryMain.CurrentVersion,
		BillDelay:     hp.BillDelay,
		Client:        client,
	}
	return dp.GetPullTaskList(kt)
}
