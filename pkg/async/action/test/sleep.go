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

package test

import (
	"hcm/pkg/async/action"
	"hcm/pkg/criteria/enumor"
	tableasync "hcm/pkg/dal/table/async"
)

/*
		SleepTpl: 睡眠任务流模版
	          |--> sleep |
	   sleep -|          | --> sleep
	          |--> sleep |
*/
var SleepTpl = action.FlowTemplate{
	Name: enumor.FlowSleepTest,
	ShareData: tableasync.NewShareData(map[string]string{
		"name": "test",
	}),
	Tasks: []action.TaskTemplate{
		{
			ActionID:   "1",
			ActionName: enumor.ActionSleep,
			Params: &action.Params{
				Type: SleepParams{},
			},
			Retry: &tableasync.Retry{
				Enable: true,
				Policy: &tableasync.RetryPolicy{
					Count:        1,
					SleepRangeMS: [2]uint{100, 200},
				},
			},
			DependOn: nil,
		},
		{
			ActionID:   "2",
			ActionName: enumor.ActionSleep,
			Params: &action.Params{
				Type: SleepParams{},
			},
			Retry: &tableasync.Retry{
				Enable: false,
			},
			DependOn: []action.ActIDType{"1"},
		},
		{
			ActionID:   "3",
			ActionName: enumor.ActionSleep,
			Params: &action.Params{
				Type: SleepParams{},
			},
			Retry: &tableasync.Retry{
				Enable: true,
				Policy: &tableasync.RetryPolicy{
					Count:        1,
					SleepRangeMS: [2]uint{100, 200},
				},
			},
			DependOn: []action.ActIDType{"1"},
		},
		{
			ActionID:   "4",
			ActionName: enumor.ActionSleep,
			Params: &action.Params{
				Type: SleepParams{},
			},
			Retry: &tableasync.Retry{
				Enable: true,
				Policy: &tableasync.RetryPolicy{
					Count:        1,
					SleepRangeMS: [2]uint{100, 200},
				},
			},
			DependOn: []action.ActIDType{"2", "3"},
		},
	},
}
