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
	"regexp"
)

const (
	qnameExtSGNameFmt  string = "[a-z0-9-]"
	qualifiedSGNameFmt        = "(" + lowEnglish + qnameExtSGNameFmt + "*)?" + lowEnglish
)

// qualifiedSGNameRegexp security group's name regexp.
var qualifiedSGNameRegexp = regexp.MustCompile("^" + qualifiedSGNameFmt + "$")

// ValidateSecurityGroupName validate security group name's length and format.
func ValidateSecurityGroupName(name string) error {
	if len(name) < 1 {
		return errors.New("invalid name, length should >= 1")
	}

	if len(name) > 60 {
		return errors.New("invalid name, length should <= 60")
	}

	return nil
}

// ValidateSecurityGroupMemo validate security group memo's length and format.
func ValidateSecurityGroupMemo(memo *string) error {
	if memo == nil {
		return errors.New("memo is nil")
	}

	content := *memo
	if len(content) == 0 {
		return nil
	}

	if len(content) > 100 {
		return errors.New("invalid memo, length should <= 100")
	}

	return nil
}
