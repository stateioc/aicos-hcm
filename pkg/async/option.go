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

package async

import (
	"github.com/prometheus/client_golang/prometheus"

	"hcm/pkg/async/consumer"
	"hcm/pkg/criteria/validator"
)

// Option define async option.
type Option struct {
	Register       prometheus.Registerer `json:"Register" validate:"required"`
	ConsumerOption *consumer.Option      `json:"consumer_option" validate:"required"`
}

// tryDefaultValue 设置默认值。
func (opt *Option) tryDefaultValue() {
	if opt.Register == nil {
		opt.Register = prometheus.DefaultRegisterer
	}
}

// Validate define Option.
func (opt *Option) Validate() error {
	return validator.Validate.Struct(opt)
}
