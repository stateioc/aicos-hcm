// SPACE-AICOS is pleased to support the open source community by making
// SPACE-AICOS available.
// Copyright (C) 2026 China Academy of Information and Communications Technology (CAICT).
// All rights reserved.
// Licensed under the MIT License (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at http://opensource.org/licenses/MIT
// Unless required by applicable law or agreed to in writing,
// software distributed under the License is distributed on
// an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND,
// either express or implied. See the License for the
// specific language governing permissions and limitations under the License.
const tableList = (app) => {
  app.get('/api/table', (req, res) => {
    res.json({
      code: 0,
      message: '',
      data: {
        list: [
          {
            id: 1,
            ip: '127.0.0.1',
            source: '微信',
            status: '正常',
            create_time: '2018-05-25 15:02:24',
            children: [],
          },
        ],
      },
    });
  });
};

module.exports = tableList;
