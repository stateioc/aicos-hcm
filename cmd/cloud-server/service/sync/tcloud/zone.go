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

package tcloud

import (
	"time"

	"hcm/pkg/api/hc-service/zone"
	hcservice "hcm/pkg/client/hc-service"
	"hcm/pkg/kit"
	"hcm/pkg/logs"
)

// SyncZone sync zone
func SyncZone(kt *kit.Kit, hcCli *hcservice.Client, accountID string, regions []string) error {

	// 重新设置rid方便定位
	kt = kt.NewSubKit()

	start := time.Now()
	logs.V(3).Infof("tcloud account[%s] sync zone start, time: %v, rid: %s", accountID, start, kt.Rid)

	defer func() {
		logs.V(3).Infof("tcloud account[%s] sync zone end, cost: %v, rid: %s", accountID, time.Since(start), kt.Rid)
	}()

	for _, region := range regions {
		syncReq := &zone.TCloudZoneSyncReq{
			AccountID: accountID,
			Region:    region,
		}
		if err := hcCli.TCloud.Zone.SyncZone(kt.Ctx, kt.Header(), syncReq); err != nil {
			logs.Errorf("sync tcloud zone failed, err: %v, req: %v, rid: %s", err, syncReq, kt.Rid)
			return err
		}
	}

	return nil
}
