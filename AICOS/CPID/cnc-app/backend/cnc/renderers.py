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
from rest_framework.renderers import JSONRenderer


class ResponseRenderer(JSONRenderer):
    """
    采用统一的结构封装返回内容
    """

    SUCCESS_CODE = 0
    SUCCESS_MESSAGE = "OK"

    def render(self, data, accepted_media_type=None, renderer_context=None):
        if not isinstance(data, dict) or "result" not in data or "code" not in data:
            data = {
                "data": data,
                "result": True,
                "code": self.SUCCESS_CODE,
                "message": self.SUCCESS_MESSAGE,
            }

        if renderer_context and "permissions" in renderer_context:
            data["permissions"] = renderer_context["permissions"]

        if renderer_context and "message" in renderer_context:
            data["message"] = renderer_context["message"]

        response = super().render(data, accepted_media_type, renderer_context)
        return response
