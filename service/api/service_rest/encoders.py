from common.json import ModelEncoder

from .models import (
    ManufacturerVO,
    VehicleModelVO,
    AutomobileVO,
    Technician,
    Status,
    ServiceAppointment,
)


class ManufacturerVOEncoder(ModelEncoder):
    model = ManufacturerVO
    properties = ["import_href", "id", "name"]


class VehicleModelVOEncoder(ModelEncoder):
    model = VehicleModelVO
    properties = ["import_href", "id", "name", "picture_url", "manufacturer"]

    encoders = {"manufacturer": ManufacturerVOEncoder()}


class AutomobileVOEncoder(ModelEncoder):
    model = AutomobileVO
    properties = ["import_href", "color", "year", "vin", "model"]

    encoders = {"model": VehicleModelVOEncoder()}


class TechnicianEncoder(ModelEncoder):
    model = Technician
    properties = ["id", "name", "employee_num"]


class StatusEncoder(ModelEncoder):
    model = Status
    properties = ["id", "name"]


class ServiceAppointmentEncoder(ModelEncoder):
    model = ServiceAppointment
    properties = [
        "id",
        "vin",
        "customer_name",
        "reason",
        "date",
        "time",
        "technician",
        "vip",
    ]

    encoders = {"technician": TechnicianEncoder()}

    def get_extra_data(self, o):
        return {"status": o.status.name}
