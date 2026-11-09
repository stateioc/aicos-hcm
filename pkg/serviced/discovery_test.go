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

package serviced

import (
	"fmt"
	"testing"
)

func Test_nilMapLen(t *testing.T) {
	var dict map[string]string
	t.Log(len(dict))
}

func varArgsWrapper(list ...string) string {
	return funVarArgs(list...)
}

func funVarArgs(list ...string) string {
	return fmt.Sprintf("list=%+v", list == nil)
}

func Test_variableArg(t *testing.T) {
	t.Log("single layer:", funVarArgs())
	t.Log("double layer", varArgsWrapper())
	var list = []string{}
	t.Log(funVarArgs(list...))
}
