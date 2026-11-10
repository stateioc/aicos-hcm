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

package cloud

import (
	"hcm/pkg/criteria/enumor"
	"hcm/pkg/criteria/validator"
	"hcm/pkg/dal/table/types"
	"hcm/pkg/dal/table/utils"
)

// DiskCvmRelColumns ...
var DiskCvmRelColumns = utils.MergeColumns(utils.InsertWithoutPrimaryID, DiskCvmRelColumnDescriptor)

// DiskCvmRelColumnDescriptor ...
var DiskCvmRelColumnDescriptor = utils.ColumnDescriptors{
	{Column: "id", NamedC: "id", Type: enumor.Numeric},
	{Column: "disk_id", NamedC: "disk_id", Type: enumor.String},
	{Column: "cvm_id", NamedC: "cvm_id", Type: enumor.String},
	{Column: "creator", NamedC: "creator", Type: enumor.String},
	{Column: "created_at", NamedC: "created_at", Type: enumor.Time},
}

// DiskCvmRelModel 云盘主机关联数据模型
type DiskCvmRelModel struct {
	ID        uint64     `db:"id" json:"id"`
	DiskID    string     `db:"disk_id" validate:"required,lte=64" json:"disk_id"`
	CvmID     string     `db:"cvm_id" validate:"required,lte=64" json:"cvm_id"`
	Creator   string     `db:"creator" validate:"required,lte=64" json:"creator"`
	CreatedAt types.Time `db:"created_at" json:"created_at"`
}

// InsertValidate ...
func (m *DiskCvmRelModel) InsertValidate() error {
	return validator.Validate.Struct(m)
}
