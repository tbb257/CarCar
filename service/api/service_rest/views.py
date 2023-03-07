from django.views.decorators.http import require_http_methods
from django.http import JsonResponse
from common.json import ModelEncoder
import json

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
    properties = ["id", "vin", "customer_name", "reason", "date", "time", "technician"]

    encoders = {"technician": TechnicianEncoder()}

    def get_extra_data(self, o):
        return {"status": o.status.name}


# ------------------------------------------------------------------------------------------- #


@require_http_methods(["GET", "POST"])
def api_technicians(request):
    if request.method == "GET":
        technicians = Technician.objects.all()

        return JsonResponse({"technicians": technicians}, encoder=TechnicianEncoder)
    else:
        content = json.loads(request.body)

        technician = Technician.objects.create(**content)
        return JsonResponse(technician, encoder=TechnicianEncoder, safe=False)


@require_http_methods(["GET", "PUT", "DELETE"])
def api_detail_technicians(request, id):
    if request.method == "GET":
        technician = Technician.objects.get(id=id)

        return JsonResponse(technician, encoder=TechnicianEncoder, safe=False)
    elif request.method == "DELETE":
        count, items = Technician.objects.filter(id=id).delete()

        if count > 0:
            return JsonResponse({"deleted": {"successful": count > 0, "items": items}})
        else:
            return JsonResponse(
                {
                    "deleted": {
                        "successful": count > 0,
                        "message": "Technician could not be deleted. Either invalid technician employee number or technician has already been deleted.",
                    }
                }
            )
    else:
        content = json.loads(request.body)
        Technician.objects.filter(id=id).update(**content)

        technician = Technician.objects.get(id=id)
        return JsonResponse(technician, encoder=TechnicianEncoder, safe=False)


# ------------------------------------------------------------------------------------------- #


@require_http_methods(["GET", "POST"])
def api_statuses(request):
    if request.method == "GET":
        statuses = Status.objects.all()

        return JsonResponse({"statuses": statuses}, encoder=StatusEncoder)
    else:
        content = json.loads(request.body)
        status = Status.objects.create(**content)

        return JsonResponse(status, encoder=StatusEncoder, safe=False)


@require_http_methods(["GET", "DELETE"])
def api_detail_statuses(request, name):
    if request.method == "GET":
        status = Status.objects.get(name=name)
        return JsonResponse(status, encoder=StatusEncoder, safe=False)
    else:
        count, items = Status.objects.filter(name=name).delete()

        if count > 0:
            return JsonResponse({"deleted": {"successful": count > 0, "items": items}})
        else:
            return JsonResponse(
                {
                    "deleted": {
                        "successful": count > 0,
                        "message": "Status could not be deleted. Either invalid status name or status has already been deleted.",
                    }
                }
            )


# ------------------------------------------------------------------------------------------- #


@require_http_methods(["GET", "POST"])
def api_appointments(request):
    if request.method == "GET":
        appointments = ServiceAppointment.objects.all()

        return JsonResponse(
            {"appointments": appointments}, encoder=ServiceAppointmentEncoder
        )
    else:
        content = json.loads(request.body)

        try:
            technician = Technician.objects.get(employee_num=content["technician"])
            content["technician"] = technician
        except Technician.DoesNotExist:
            return JsonResponse(
                {"message": "Invalid technician employee number"}, status=400
            )

        appointment = ServiceAppointment.objects.create(**content)

        return JsonResponse(appointment, encoder=ServiceAppointmentEncoder, safe=False)


@require_http_methods(["GET", "PUT", "DELETE"])
def api_detail_appointments(request, id):
    if request.method == "GET":
        appointment = ServiceAppointment.objects.get(id=id)

        return JsonResponse(appointment, encoder=ServiceAppointmentEncoder, safe=False)
    elif request.method == "DELETE":
        count, items = ServiceAppointment.objects.filter(id=id).delete()

        if count > 0:
            return JsonResponse({"deleted": {"successful": count > 0, "items": items}})
        else:
            return JsonResponse(
                {
                    "deleted": {
                        "successful": count > 0,
                        "message": "Appointment could not be deleted. Either invalid appointment ID or appointment has already been deleted.",
                    }
                }
            )
    else:
        content = json.loads(request.body)

        if "technician" in content:
            try:
                technician = Technician.objects.get(
                    employee_num=content["technician number"]
                )
                content["technician"] = technician
            except Technician.DoesNotExist:
                return JsonResponse(
                    {"message": "Invalid technician employee number"}, status=400
                )

        ServiceAppointment.objects.filter(id=id).update(**content)

        appointment = ServiceAppointment.objects.get(id=id)
        return JsonResponse(appointment, encoder=ServiceAppointmentEncoder, safe=False)
