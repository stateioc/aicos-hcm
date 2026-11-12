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

insert into id_generator(`resource`, `max_id`)
values ('account_bill_config', '0');

CREATE TABLE `account_bill_config`
(
    `id`                  varchar(64) not null,
    `vendor`              varchar(16) not null default '',
    `account_id`          varchar(64) not null,
    `cloud_database_name` varchar(64)          default '',
    `cloud_table_name`    varchar(64)          default '',
    `status`              tinyint unsigned default '0',
    `err_msg`             json                 default NULL,
    `extension`           json                 default NULL,
    `creator`             varchar(64)          default '',
    `reviser`             varchar(64)          default '',
    `created_at`          timestamp   not null default current_timestamp,
    `updated_at`          timestamp   not null default current_timestamp on update current_timestamp,
    primary key (`id`),
    unique key `idx_uk_vendor_account_id` (`vendor`, `account_id`)
) engine = innodb
  default charset = utf8mb4;

alter table azure_security_group_rule drop index `idx_uk_name`;

alter table azure_security_group_rule add unique key `idx_uk_name_cloud_security_group_id` (`name`, `cloud_security_group_id`);
