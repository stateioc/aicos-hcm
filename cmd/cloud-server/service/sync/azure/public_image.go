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

package azure

import (
	"time"

	protoimage "hcm/pkg/api/hc-service/image"
	hcservice "hcm/pkg/client/hc-service"
	"hcm/pkg/kit"
	"hcm/pkg/logs"
)

// SyncAzureImage ...
func SyncAzureImage(kt *kit.Kit, hcCli *hcservice.Client, accountID string, regions []string,
	resGroupNames []string) error {

	// 重新设置rid方便定位
	kt = kt.NewSubKit()

	start := time.Now()
	logs.V(3).Infof("azure account[%s] sync image start, time: %v, rid: %s", accountID, start, kt.Rid)

	defer func() {
		logs.V(3).Infof("azure account[%s] sync image end, cost: %v, rid: %s", accountID, time.Since(start), kt.Rid)
	}()

	for _, region := range regions {
		for _, name := range resGroupNames {
			req := &protoimage.AzureImageSyncReq{
				AccountID:         accountID,
				Region:            region,
				ResourceGroupName: name,
			}
			if err := hcCli.Azure.Image.SyncImage(kt.Ctx, kt.Header(), req); err != nil {
				logs.Errorf("sync azure image failed, err: %v, req: %v, rid: %s", err, req, kt.Rid)
				return err
			}

			break
		}

		break
	}

	return nil
}
