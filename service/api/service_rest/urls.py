from django.urls import path

from .views import (
    api_technicians,
    api_detail_technicians,
    api_statuses,
    api_detail_statuses,
    api_appointments,
    api_detail_appointments,
)

urlpatterns = [
    path("technicians/", api_technicians, name="api_technicians"),
    path(
        "technicians/<int:id>/", api_detail_technicians, name="api_detail_technicians"
    ),
    path("statuses/", api_statuses, name="api_statuses"),
    path("statuses/<str:name>/", api_detail_statuses, name="api_detail_statuses"),
    path("appointments/", api_appointments, name="api_appointments"),
    path(
        "appointments/<int:id>/",
        api_detail_appointments,
        name="api_detail_appointments",
    ),
]
