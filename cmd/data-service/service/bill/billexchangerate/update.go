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

package billexchangerate

import (
	"fmt"

	dataservice "hcm/pkg/api/data-service/bill"
	"hcm/pkg/criteria/errf"
	"hcm/pkg/dal/dao/orm"
	tablebill "hcm/pkg/dal/table/bill"
	"hcm/pkg/dal/table/types"
	"hcm/pkg/logs"
	"hcm/pkg/rest"

	"github.com/jmoiron/sqlx"
)

// UpdateBillExchangeRate account with options
func (svc *service) UpdateBillExchangeRate(cts *rest.Contexts) (any, error) {

	req := new(dataservice.ExchangeRateUpdateReq)

	if err := cts.DecodeInto(req); err != nil {
		return nil, errf.NewFromErr(errf.DecodeRequestFailed, err)
	}

	if err := req.Validate(); err != nil {
		return nil, errf.NewFromErr(errf.InvalidParameter, err)
	}

	r := &tablebill.AccountBillExchangeRate{
		ID:           req.ID,
		Year:         req.Year,
		Month:        req.Month,
		FromCurrency: req.FromCurrency,
		ToCurrency:   req.ToCurrency,
		Reviser:      cts.Kit.User,
	}
	if req.ExchangeRate != nil {
		r.ExchangeRate = &types.Decimal{Decimal: *req.ExchangeRate}
	}
	_, err := svc.dao.Txn().AutoTxn(cts.Kit, func(txn *sqlx.Tx, opt *orm.TxnOption) (interface{}, error) {
		err := svc.dao.AccountBillExchangeRate().UpdateByIDWithTx(cts.Kit, txn, r.ID, r)
		if err != nil {
			logs.Errorf("update account bill exchange rate failed, err: %v, id: %s, rid: %s", err, r.ID, cts.Kit.Rid)
			return nil, fmt.Errorf("update bill exchange rate failed, err: %v", err)
		}
		return nil, nil
	})
	if err != nil {
		return nil, err
	}

	return nil, nil
}
