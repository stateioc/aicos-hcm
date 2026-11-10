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

package consumer

/*
Commander （指挥者）
		1. 强制关闭处于执行中的任务
*/
type Commander interface {
	CancelTasks(taskIDs []string) error
}

// NewCommander new commander.
func NewCommander(exec Executor) Commander {
	return &commander{
		executor: exec,
	}
}

// commander ...
type commander struct {
	executor Executor
}

// CancelTasks 控制取消多个任务
func (cmd *commander) CancelTasks(taskIDs []string) error {
	return cmd.executor.CancelTasks(taskIDs)
}
