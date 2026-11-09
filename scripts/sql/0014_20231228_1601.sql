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

/*
    SQLVER=0014,HCMVER=v1.3.3

    Notes:
    1. 修改子账号表唯一键索引为vendor, account_id, cloud_id
*/

START TRANSACTION;


alter table sub_account
    drop key idx_uk_vendor_cloud_id;
alter table sub_account
    add constraint idx_uk_vendor_account_id_cloud_id unique (vendor, account_id, cloud_id);

CREATE OR REPLACE VIEW `hcm_version`(`hcm_ver`, `sql_ver`) AS
SELECT 'v1.3.3' as `hcm_ver`, '0014' as `sql_ver`;

COMMIT