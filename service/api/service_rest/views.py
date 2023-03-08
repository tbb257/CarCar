from django.views.decorators.http import require_http_methods
from django.http import JsonResponse
import json

from .encoders import TechnicianEncoder, StatusEncoder, ServiceAppointmentEncoder
from .models import AutomobileVO, Technician, Status, ServiceAppointment


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
                },
                status=404,
            )
    else:
        content = json.loads(request.body)
        Technician.objects.filter(id=id).update(**content)

        technician = Technician.objects.get(id=id)
        return JsonResponse(technician, encoder=TechnicianEncoder, safe=False)


# ---------------------------------------------------------------------------------------------- #


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
                },
                status=404,
            )


# ---------------------------------------------------------------------------------------------- #


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
                {"message": "Invalid technician employee number"}, status=404
            )

        vins = []
        automobiles = AutomobileVO.objects.all()
        for automobile in automobiles:
            vins.append(automobile.vin)
        if content["vin"] in vins:
            content["vip"] = True

        appointment = ServiceAppointment.create(**content)

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
                },
                status=404,
            )
    else:
        content = json.loads(request.body)

        if "technician" in content:
            try:
                technician = Technician.objects.get(employee_num=content["technician"])
                content["technician"] = technician
            except Technician.DoesNotExist:
                return JsonResponse(
                    {"message": "Invalid technician employee number"}, status=404
                )

        if "status" in content:
            try:
                if content["status"] == "CANCELLED":
                    appointment = ServiceAppointment.objects.get(id=id)
                    appointment.cancel()
                    del content["status"]
                elif content["status"] == "FINISHED":
                    appointment = ServiceAppointment.objects.get(id=id)
                    appointment.finish()
                    del content["status"]
                else:
                    raise ValueError
            except ValueError:
                return JsonResponse(
                    {
                        "message": "Invalid status name. Your options are 'CANCELLED' or 'FINISHED'."
                    },
                    status=404,
                )

        ServiceAppointment.objects.filter(id=id).update(**content)

        appointment = ServiceAppointment.objects.get(id=id)
        return JsonResponse(appointment, encoder=ServiceAppointmentEncoder, safe=False)
