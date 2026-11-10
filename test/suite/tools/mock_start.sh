#!/bin/bash
# SPACE-AICOS is pleased to support the open source community by making
# SPACE-AICOS available.
# Copyright (C) 2026 China Academy of Information and Communications Technology (CAICT).
# All rights reserved.
# Licensed under the MIT License (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at http://opensource.org/licenses/MIT
# Unless required by applicable law or agreed to in writing,
# software distributed under the License is distributed on
# an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND,
# either express or implied. See the License for the
# specific language governing permissions and limitations under the License.
RUN_DIR=$(realpath ${RUN_DIR:-"."})

mkdir -p $RUN_DIR
mkdir -p ${BIN_DIR:="$RUN_DIR/bin"}
mkdir -p ${ETC_DIR:="$RUN_DIR/etc"}

BIN_DIR=$(realpath ${BIN_DIR})
ETC_DIR=$(realpath ${ETC_DIR})

echo mock running under ${RUN_DIR},
echo BIN_DIR=${BIN_DIR}, ETC_DIR=${ETC_DIR}

cd $RUN_DIR

$BIN_DIR/bk-hcm-dataservice  -c $ETC_DIR/data_service.yaml &
$BIN_DIR/bk-hcm-cloudserver -c  $ETC_DIR/cloud_server.yaml &
$BIN_DIR/bk-hcm-hcservice -c  $ETC_DIR/hc_service.yaml &
$BIN_DIR/bk-hcm-authserver -c  $ETC_DIR/auth_server.yaml --disable-auth &


function ctrl_c() {
    echo -e '\033[31;1mKilling...\033[0m'
    pkill bk-hcm
}
trap ctrl_c INT

# wait all service exit
wait



