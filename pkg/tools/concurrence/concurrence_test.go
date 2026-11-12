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

package concurrence

import (
	"fmt"
	"reflect"
	"testing"
)

func TestBaseExecWithResult(t *testing.T) {
	type args[T any, R any] struct {
		concurrenceLimit int
		params           []T
		execFunc         func(param T) (R, error)
	}
	type testCase[T any, R any] struct {
		name    string
		args    args[T, R]
		want    []R
		wantErr bool
	}
	tests := []testCase[string, string]{
		{
			name: "happy path",
			args: args[string, string]{
				concurrenceLimit: 3,
				params:           []string{"1", "2", "3"},
				execFunc: func(param string) (string, error) {
					return param, nil
				},
			},
			want:    []string{"1", "2", "3"},
			wantErr: false,
		},
		{
			name: "error case",
			args: args[string, string]{
				concurrenceLimit: 3,
				params:           []string{"1", "2", "3"},
				execFunc: func(param string) (string, error) {
					return "", fmt.Errorf("this is an error")
				},
			},
			want:    nil,
			wantErr: true,
		},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			got, err := BaseExecWithResult(tt.args.concurrenceLimit, tt.args.params, tt.args.execFunc)
			if (err != nil) != tt.wantErr {
				t.Errorf("BaseExecWithResult() error = %v, wantErr %v", err, tt.wantErr)
				return
			}
			if !reflect.DeepEqual(got, tt.want) {
				t.Errorf("BaseExecWithResult() got = %v, want %v", got, tt.want)
			}
		})
	}
}
