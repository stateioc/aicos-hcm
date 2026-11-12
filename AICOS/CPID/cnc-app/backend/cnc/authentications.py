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
from rest_framework.authentication import BasicAuthentication
from django.contrib.auth import get_user_model


token_set = {"bbc73c45893e41e8932ecfc267e20ce0", "046d27ea2aff4ec2a9a99dda6687349d"}


class TokenAuthentication(BasicAuthentication):
    def authenticate(self, request):
        token = request.headers.get("token")
        if token not in token_set:
            return None
        user = get_user_model().objects.all().first()
        return (user, None)
