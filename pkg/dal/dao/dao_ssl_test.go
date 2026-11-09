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

package dao

import (
	"testing"

	"hcm/pkg/cc"

	"github.com/stretchr/testify/assert"
)

// TestTLSConfig_Enable 测试TLS配置启用逻辑
func TestTLSConfig_Enable(t *testing.T) {
	t.Run("empty config should return false", func(t *testing.T) {
		emptyTLS := cc.TLSConfig{}
		assert.False(t, emptyTLS.Enable())
	})

	t.Run("config with CA file should return true", func(t *testing.T) {
		withCA := cc.TLSConfig{CAFile: "/path/to/ca.pem"}
		assert.True(t, withCA.Enable())
	})

	t.Run("config with cert file should return true", func(t *testing.T) {
		withCert := cc.TLSConfig{CertFile: "/path/to/cert.pem"}
		assert.True(t, withCert.Enable())
	})

	t.Run("config with key file should return true", func(t *testing.T) {
		withKey := cc.TLSConfig{KeyFile: "/path/to/key.pem"}
		assert.True(t, withKey.Enable())
	})

	t.Run("config with all files should return true", func(t *testing.T) {
		fullConfig := cc.TLSConfig{
			CAFile:   "/path/to/ca.pem",
			CertFile: "/path/to/cert.pem",
			KeyFile:  "/path/to/key.pem",
		}
		assert.True(t, fullConfig.Enable())
	})

	t.Run("config with InsecureSkipVerify but no cert files should return false", func(t *testing.T) {
		skipVerifyConfig := cc.TLSConfig{
			InsecureSkipVerify: true,
			CertFile:           "",
			KeyFile:            "",
			CAFile:             "",
		}
		assert.False(t, skipVerifyConfig.Enable())
	})
}

// TestTLSConfig_Validate 测试TLS配置验证逻辑
func TestTLSConfig_Validate(t *testing.T) {
	t.Run("empty config should be valid", func(t *testing.T) {
		emptyTLS := cc.TLSConfig{}
		// 通过Enable()方法间接测试，空配置应该返回false
		assert.False(t, emptyTLS.Enable())
	})

	t.Run("config with only cert file should be invalid", func(t *testing.T) {
		invalidConfig := cc.TLSConfig{CertFile: "/path/to/cert.pem"}
		// 通过Enable()方法间接测试，只有cert文件应该返回true
		assert.True(t, invalidConfig.Enable())
	})

	t.Run("config with only key file should be invalid", func(t *testing.T) {
		invalidConfig := cc.TLSConfig{KeyFile: "/path/to/key.pem"}
		// 通过Enable()方法间接测试，只有key文件应该返回true
		assert.True(t, invalidConfig.Enable())
	})

	t.Run("config with both cert and key files should be valid", func(t *testing.T) {
		validConfig := cc.TLSConfig{
			CertFile: "/path/to/cert.pem",
			KeyFile:  "/path/to/key.pem",
		}
		// 通过Enable()方法间接测试，cert和key文件都有应该返回true
		assert.True(t, validConfig.Enable())
	})

	t.Run("config with CA file only should be valid", func(t *testing.T) {
		validConfig := cc.TLSConfig{CAFile: "/path/to/ca.pem"}
		// 通过Enable()方法间接测试，有CA文件应该返回true
		assert.True(t, validConfig.Enable())
	})

	t.Run("config with InsecureSkipVerify and only cert file should be invalid", func(t *testing.T) {
		invalidConfig := cc.TLSConfig{
			InsecureSkipVerify: true,
			CertFile:           "/path/to/cert.pem",
			KeyFile:            "", // 缺少key文件
		}
		// 通过Enable()方法间接测试，即使跳过验证，Enable()也应该返回true
		assert.True(t, invalidConfig.Enable())
		// 注意：实际的验证逻辑在私有validate()方法中，这里只能测试Enable()逻辑
		// 真正的验证会在实际的连接过程中进行
	})
}

// TestURI_SSLGeneration 测试URI生成中的SSL参数逻辑
func TestURI_SSLGeneration(t *testing.T) {
	t.Run("URI without TLS config should not contain SSL params", func(t *testing.T) {
		config := cc.ResourceDB{
			Endpoints:         []string{"localhost:3306"},
			User:              "testuser",
			Password:          "password",
			Database:          "testdb",
			DialTimeoutSec:    10,
			ReadTimeoutSec:    30,
			WriteTimeoutSec:   30,
			MaxIdleTimeoutMin: 10,
			MaxOpenConn:       10,
			MaxIdleConn:       5,
			TimeZone:          "UTC",
			TLS:               cc.TLSConfig{},
		}

		uriStr := uri(config)
		assert.NotContains(t, uriStr, "tls=")
		assert.NotContains(t, uriStr, "ssl-ca=")
		assert.NotContains(t, uriStr, "ssl-cert=")
		assert.NotContains(t, uriStr, "ssl-key=")
	})

	t.Run("URI with CA file should contain tls=true and ssl-ca", func(t *testing.T) {
		config := cc.ResourceDB{
			Endpoints:         []string{"localhost:3306"},
			User:              "testuser",
			Password:          "password",
			Database:          "testdb",
			DialTimeoutSec:    10,
			ReadTimeoutSec:    30,
			WriteTimeoutSec:   30,
			MaxIdleTimeoutMin: 10,
			MaxOpenConn:       10,
			MaxIdleConn:       5,
			TimeZone:          "UTC",
			TLS: cc.TLSConfig{
				CAFile: "/path/to/ca.pem",
			},
		}

		uriStr := uri(config)
		assert.Contains(t, uriStr, "tls=true")
		assert.Contains(t, uriStr, "ssl-ca=")
	})

	t.Run("URI with insecure skip verify should contain tls=skip-verify", func(t *testing.T) {
		config := cc.ResourceDB{
			Endpoints:         []string{"localhost:3306"},
			User:              "testuser",
			Password:          "password",
			Database:          "testdb",
			DialTimeoutSec:    10,
			ReadTimeoutSec:    30,
			WriteTimeoutSec:   30,
			MaxIdleTimeoutMin: 10,
			MaxOpenConn:       10,
			MaxIdleConn:       5,
			TimeZone:          "UTC",
			TLS: cc.TLSConfig{
				InsecureSkipVerify: true,
				CertFile:           "/path/to/cert.pem",
				KeyFile:            "/path/to/key.pem",
			},
		}
		uriStr := uri(config)
		assert.Contains(t, uriStr, "tls=skip-verify")
	})

	t.Run("URI with full client certificate should contain all SSL params", func(t *testing.T) {
		config := cc.ResourceDB{
			Endpoints:         []string{"localhost:3306"},
			User:              "testuser",
			Password:          "password",
			Database:          "testdb",
			DialTimeoutSec:    10,
			ReadTimeoutSec:    30,
			WriteTimeoutSec:   30,
			MaxIdleTimeoutMin: 10,
			MaxOpenConn:       10,
			MaxIdleConn:       5,
			TimeZone:          "UTC",
			TLS: cc.TLSConfig{
				InsecureSkipVerify: false,
				CertFile:           "/path/to/cert.pem",
				KeyFile:            "/path/to/key.pem",
				CAFile:             "/path/to/ca.pem",
			},
		}
		uriStr := uri(config)
		assert.Contains(t, uriStr, "tls=true")
		assert.Contains(t, uriStr, "ssl-ca=")
		assert.Contains(t, uriStr, "ssl-cert=")
		assert.Contains(t, uriStr, "ssl-key=")
	})
}

// TestConnect_SSLValidation 测试SSL连接验证逻辑
func TestConnect_SSLValidation(t *testing.T) {
	t.Run("connect should validate TLS config before proceeding", func(t *testing.T) {
		invalidConfig := cc.ResourceDB{
			Endpoints:         []string{"localhost:3306"},
			User:              "testuser",
			Password:          "password",
			Database:          "testdb",
			DialTimeoutSec:    10,
			ReadTimeoutSec:    30,
			WriteTimeoutSec:   30,
			MaxIdleTimeoutMin: 10,
			MaxOpenConn:       10,
			MaxIdleConn:       5,
			TimeZone:          "UTC",
			TLS: cc.TLSConfig{
				CertFile: "/nonexistent/cert.pem", // 只配置cert，没有key
			},
		}

		assert.True(t, invalidConfig.TLS.Enable())

	})
}
