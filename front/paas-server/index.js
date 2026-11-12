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

const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const port = process.env.PORT || 5000;

// 设置项目根路径
const projectRoot = path.resolve(__dirname);
const distPath = path.join(projectRoot, '../dist');

// 配置静态资源服务 - 使用/static作为访问入口
const staticPath = path.join(distPath, '');
app.use(
  '/static',
  express.static(staticPath, {
    cacheControl: false,
  }),
);

// 主入口文件路径
const indexPath = path.join(distPath, 'index.html');
if (!fs.existsSync(indexPath)) {
  throw new Error('index.html not found in dist directory!');
}

// 读取index.html内容
let indexContent = '';
try {
  indexContent = fs.readFileSync(indexPath, 'utf8');
} catch (error) {
  console.error('Error reading index.html:', error);
  process.exit(1);
}

// 处理所有非静态资源的GET请求
app.get('*', (req, res) => {
  // 检查请求路径是否是静态资源路径
  if (req.path.startsWith('/static') || req.path.startsWith('/assets')) {
    return res.status(404).send('Not Found');
  }

  try {
    // 返回index.html内容
    res.send(indexContent);
  } catch (error) {
    console.error('Error serving SPA:', error);
    res.status(500).send('Internal Server Error');
  }
});

// 启动服务器
app.listen(port, () => {
  // eslint-disable-next-line
  console.log(`
  🚀 Server running at: http://localhost:${port}
  📂 Static resources served from: ${staticPath}
  🏠 SPA served from: ${indexPath}
  `);
});
