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

package account

import "hcm/pkg/tools/converter"

// AzureAccount define azure account.
type AzureAccount struct {
	DisplayNameName   *string `json:"display_name_name"`
	GivenName         *string `json:"given_name"`
	SurName           *string `json:"sur_name"`
	UserPrincipalName *string `json:"user_principal_name"`
	ID                *string `json:"id"`
}

// GetCloudID ...
func (account AzureAccount) GetCloudID() string {
	return converter.PtrToVal(account.ID)
}
