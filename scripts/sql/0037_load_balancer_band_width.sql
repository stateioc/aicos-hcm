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
    SQLVER=0037,HCMVER=v1.8.2

    Notes:
    1. 修改`load_balancer`表，增加`band_width`、`isp`字段
*/

START TRANSACTION;

alter table load_balancer
    add band_width int not null default 0 after status;

alter table load_balancer
    add isp varchar(64) not null default '' after status;

CREATE OR REPLACE VIEW `hcm_version`(`hcm_ver`, `sql_ver`) AS
SELECT 'v1.8.2' as `hcm_ver`, '0037' as `sql_ver`;

COMMIT;
