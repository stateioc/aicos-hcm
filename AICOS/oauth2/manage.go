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
package oauth2

import (
	"context"
	"net/http"
	"time"
)

// TokenGenerateRequest provide to generate the token request parameters
type TokenGenerateRequest struct {
	ClientID            string
	ClientSecret        string
	UserID              string
	RedirectURI         string
	Scope               string
	Code                string
	CodeChallenge       string
	CodeChallengeMethod CodeChallengeMethod
	Refresh             string
	CodeVerifier        string
	AccessTokenExp      time.Duration
	Request             *http.Request
}

// Manager authorization management interface
type Manager interface {
	// get the client information
	GetClient(ctx context.Context, clientID string) (cli ClientInfo, err error)

	// generate the authorization token(code)
	GenerateAuthToken(ctx context.Context, rt ResponseType, tgr *TokenGenerateRequest) (authToken TokenInfo, err error)

	// generate the access token
	GenerateAccessToken(ctx context.Context, gt GrantType, tgr *TokenGenerateRequest) (accessToken TokenInfo, err error)

	// refreshing an access token
	RefreshAccessToken(ctx context.Context, tgr *TokenGenerateRequest) (accessToken TokenInfo, err error)

	// use the access token to delete the token information
	RemoveAccessToken(ctx context.Context, access string) (err error)

	// use the refresh token to delete the token information
	RemoveRefreshToken(ctx context.Context, refresh string) (err error)

	// according to the access token for corresponding token information
	LoadAccessToken(ctx context.Context, access string) (ti TokenInfo, err error)

	// according to the refresh token for corresponding token information
	LoadRefreshToken(ctx context.Context, refresh string) (ti TokenInfo, err error)
}
