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

alter table azure_security_group_rule drop index `idx_uk_name`;

alter table azure_security_group_rule add unique key `idx_uk_name` (`name`, `cloud_security_group_id`);

alter table `eip` drop column `instance_id`;
alter table `eip` drop column `instance_type`;
alter table `account` drop column  `sync_status`;
alter table `recycle_record` drop index `idx_res_type_vendor_cloud_res_id`;
alter table `recycle_record` drop index `idx_res_type_res_id`;
alter table `recycle_record` modify column `id` varchar(64)  not null;
insert into id_generator(`resource`, `max_id`) values ('recycle_record_task_id', '0');