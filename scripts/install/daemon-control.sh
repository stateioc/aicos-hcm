#!/bin/sh
#######################################
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
#######################################

# app informations.
APPBIN="python"
APPARGS="-m SimpleHTTPServer 8001"
BINPATH="/usr/bin"

# start app.
start() {
    echo -n $"Start ${APPBIN}..."

    # make log-dir if not exists.
    if [[ ! -d "./log" ]];then
        mkdir ./log
    fi

    ${BINPATH}/${APPBIN} ${APPARGS} > ./log/std.log 2>&1 &
    echo
    return
}

# stop app.
stop() {
    pid=`ps -ef | grep ${APPBIN} | grep -v grep | grep -v tail | awk '{print $2}'`
    if [ -n "$pid" ];then
        kill $pid
    fi

    return
}

# show daemon status.
status() {
    ps -ef | grep -w "${APPBIN}" | grep -v grep | grep -v -w sh
}

# switch cmd.
case "$1" in
    start)
        status && exit 0
        $1
    ;;
    stop)
        status || exit 0
        $1
    ;;
    status)
        $1
    ;;
    *)
        echo $"Usage: $0 {start|stop|status}"
        exit 2
esac