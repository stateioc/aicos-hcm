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

package service

import (
	"bytes"
	"fmt"
	"io/ioutil"
	"net/http"
	"regexp"

	"hcm/pkg/criteria/errf"
	"hcm/pkg/logs"
	"hcm/pkg/runtime/gwparser"

	"github.com/emicklei/go-restful/v3"
)

// restFilter returns api server's restful request filter, we filter all requests base on URL.
func (p *proxy) restFilter() restful.FilterFunction {
	return func(req *restful.Request, resp *restful.Response, chain *restful.FilterChain) {
		r, w := req.Request, resp.ResponseWriter

		// parse request
		kt, err := gwparser.Parse(r.Context(), r.Header)
		if err != nil {
			w.WriteHeader(http.StatusForbidden)
			fmt.Fprintf(w, errf.Error(err).Error())
			return
		}
		req.Request.Header = kt.Header()

		body, err := peekRequest(r)
		if err != nil {
			w.WriteHeader(http.StatusForbidden)
			fmt.Fprintf(w, errf.NewFromErr(errf.Unknown, err).Error())
			logs.Errorf("peek request failed, err: %v, rid: %s", err, kt.Rid)
			return
		}
		// request and response details landing log for monitoring and troubleshooting problem.
		logs.Infof("uri: %s, method: %s, body: %s, appcode: %s, user: %s, remote addr: %s, "+
			"rid: %s", r.RequestURI, r.Method, body, kt.AppCode, kt.User, r.RemoteAddr, kt.Rid)

		chain.ProcessFilter(req, resp)
	}
}

func peekRequest(req *http.Request) (string, error) {
	if req.Body != nil {
		byt, err := ioutil.ReadAll(req.Body)
		if err != nil {
			return "", err
		}

		req.Body = ioutil.NopCloser(bytes.NewBuffer(byt))

		reg := regexp.MustCompile("\\s+")
		str := reg.ReplaceAllString(string(byt), "")
		return str, nil
	}

	return "", nil
}
