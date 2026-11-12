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
from django.urls import path

from . import views

urlpatterns = [
    path(
        "computing_ids/",
        views.ComputingIDViewSet.as_view({"post": "create"}),
        name="computing_ids",
    ),
    path(
        "computing_resources/",
        views.ComputingResourceSKUViewSet.as_view({"post": "create"}),
        name="computing_resources",
    ),
    path(
        "query_computing_resources/",
        views.QueryComputingResourceViewSet.as_view({"post": "create"}),
        name="query_computing_resources",
    ),
    path(
        "query_computing_resources_by_task_template/",
        views.QueryComputingResourceByTaskTemplateViewSet.as_view({"post": "create"}),
        name="query_computing_resources_by_task_template",
    ),
    path(
        "task_path/",
        views.TaskPathViewSet.as_view({"post": "create"}),
        name="task_path",
    ),
]
