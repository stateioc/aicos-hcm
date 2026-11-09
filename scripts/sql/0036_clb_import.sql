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
    SQLVER=0036,HCMVER=v1.8.2

    Notes:
    1. 修改`target_group_listener_rule_rel`表，新增 cloud_listener_rule_id 索引
*/

START TRANSACTION;

alter table target_group_listener_rule_rel
    add index idx_cloud_listener_rule_id (cloud_listener_rule_id);

CREATE OR REPLACE VIEW `hcm_version`(`hcm_ver`, `sql_ver`) AS
SELECT 'v1.8.2' as `hcm_ver`, '0036' as `sql_ver`;

COMMIT;
