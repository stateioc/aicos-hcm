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

package validator

import (
	"errors"
	"fmt"
	"regexp"
)

const (
	// qualifiedNameFmt hcm resource's name format.
	// '.' And '/' as reserved characters, users are absolutely not allowed to create
	qualifiedNameFmt        = "(" + chineseEnglishNumberFmt + qnameExtNameFmt + "*)?" + chineseEnglishNumberFmt
	qnameExtNameFmt  string = "[\u4E00-\u9FA5A-Za-z0-9-_]"
)

// qualifiedNameRegexp hcm resource's name regexp.
var qualifiedNameRegexp = regexp.MustCompile("^" + qualifiedNameFmt + "$")

// ValidateName validate hcm resource name's length and format.
func ValidateName(name string) error {
	if len(name) < 1 {
		return errors.New("invalid name, length should >= 1")
	}

	if len(name) > 128 {
		return errors.New("invalid name, length should <= 128")
	}

	if !qualifiedNameRegexp.MatchString(name) {
		return fmt.Errorf("invalid name: %s, only allows to include chinese、english、numbers、underscore (_)"+
			"、hyphen (-), and must start and end with an chinese、english、numbers", name)
	}

	return nil
}
