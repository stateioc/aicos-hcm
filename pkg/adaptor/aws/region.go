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

package aws

import (
	typesRegion "hcm/pkg/adaptor/types/region"
	"hcm/pkg/kit"
	"hcm/pkg/logs"
	"hcm/pkg/tools/converter"

	"github.com/aws/aws-sdk-go/service/ec2"
)

// ListRegion list region.
// reference: https://docs.aws.amazon.com/goto/WebAPI/ec2-2016-11-15/DescribeRegions
// Managing AWS Regions: https://docs.aws.amazon.com/general/latest/gr/rande-manage.html
func (a *Aws) ListRegion(kt *kit.Kit) (*typesRegion.AwsRegionListResult, error) {

	client, err := a.clientSet.ec2Client(a.DefaultRegion())
	if err != nil {
		return nil, err
	}

	req := &ec2.DescribeRegionsInput{
		AllRegions:  nil,
		DryRun:      nil,
		Filters:     nil,
		RegionNames: nil,
	}

	resp, err := client.DescribeRegionsWithContext(kt.Ctx, req)
	if err != nil {
		logs.Errorf("list aws region failed, err: %v, rid: %s", err, kt.Rid)
		return nil, err
	}

	details := make([]typesRegion.AwsRegion, 0, len(resp.Regions))
	for _, data := range resp.Regions {
		tmpData := typesRegion.AwsRegion{
			RegionID:    converter.PtrToVal(data.RegionName),
			RegionName:  converter.PtrToVal(data.RegionName),
			RegionState: converter.PtrToVal(data.OptInStatus),
			Endpoint:    converter.PtrToVal(data.Endpoint),
		}
		details = append(details, tmpData)
	}

	return &typesRegion.AwsRegionListResult{Count: converter.ValToPtr(uint64(len(resp.Regions))),
		Details: details}, nil
}
