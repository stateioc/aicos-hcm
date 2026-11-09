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

package times

import (
	"testing"
	"time"

	"github.com/stretchr/testify/assert"
)

func TestDaysInMonth(t *testing.T) {
	testCases := []struct {
		year  int
		month time.Month
		days  int
	}{
		{
			year:  2024,
			month: time.Month(5),
			days:  31,
		},
		{
			year:  2024,
			month: time.Month(4),
			days:  30,
		},
	}
	for _, testCase := range testCases {
		days := DaysInMonth(testCase.year, testCase.month)
		assert.Equal(t, days, testCase.days)
	}
}
