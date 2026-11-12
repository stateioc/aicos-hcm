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
package oauth2_test

import (
	"testing"

	"github.com/go-oauth2/oauth2/v4"
)

func TestValidatePlain(t *testing.T) {
	cc := oauth2.CodeChallengePlain
	if !cc.Validate("plaintest", "plaintest") {
		t.Fatal("not valid")
	}
}

func TestValidateS256(t *testing.T) {
	cc := oauth2.CodeChallengeS256
	if !cc.Validate("W6YWc_4yHwYN-cGDgGmOMHF3l7KDy7VcRjf7q2FVF-o=", "s256test") {
		t.Fatal("not valid")
	}
}

func TestValidateS256NoPadding(t *testing.T) {
	cc := oauth2.CodeChallengeS256
	if !cc.Validate("W6YWc_4yHwYN-cGDgGmOMHF3l7KDy7VcRjf7q2FVF-o", "s256test") {
		t.Fatal("not valid")
	}
}
