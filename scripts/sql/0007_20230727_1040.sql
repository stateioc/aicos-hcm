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
    SQLVER=0007,HCMVER=v1.1.20

    Notes:
        1. gcp_firewall_rule调整name唯一索引为name,account_id联合唯一索引。
*/

alter table gcp_firewall_rule drop index idx_uk_name;
alter table gcp_firewall_rule add unique key `idx_uk_account_id_name` (`account_id`, `name`);
