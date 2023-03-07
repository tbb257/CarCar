from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
import json
from common.json import ModelEncoder

from .models import SalesPerson, Customer, ManufacturerVO, VehicleModelVO, AutomobileVO, SalesRecord


class SalesPeopleEncoder(ModelEncoder):
    model = SalesPerson
    properties = [
        "name",
        "id"
    ]
class SalesPersonEncoder(ModelEncoder):
    model = SalesPerson
    properties = [
        "name",
        "employee_number",
        "id",
    ]

class CustomerListEncoder(ModelEncoder):
    model = Customer
    properties = [
        "name",
        "id"
    ]

class CustomerDetailEncoder(ModelEncoder):
    model = Customer
    properties = [
        "name",
        "id",
        "address",
        "phone_number",
    ]

# Create your views here.
@require_http_methods(["GET", "POST"])
def api_salespeople(request):
    if request.method == "GET":
        response = SalesPerson.objects.all()
        return JsonResponse(
            {"salesperson":response},
            encoder = SalesPeopleEncoder
        )
    else:
        try:
            content = json.loads(request.body)
            response = SalesPerson.objects.create(**content)
            return JsonResponse(
                response,
                encoder=SalesPersonEncoder,
                safe=False,
        )
        except:
            response = JsonResponse(
                {"message": "Could not create this Salesperson"}
                )
            response.status_code = 400
            return response

@require_http_methods(["GET", "DELETE", "PUT"])
def api_salesperson(request, id):
    if request.method == "GET":
        try:
            salesperson = SalesPerson.objects.get(id=id)
            return JsonResponse(
                salesperson,
                encoder=SalesPersonEncoder,
                safe=False
            )
        except SalesPerson.DoesNotExist:
            response = JsonResponse({"message":"This person does not exist or has been deleted, check ID"})
            response.status_code = 404
            return response
    elif request.method == "DELETE":
        try:
            salesperson = SalesPerson.objects.get(id=id)
            salesperson.delete()
            return JsonResponse(
                {"Deletion":"Successful"},
                safe=False
            )
        except SalesPerson.DoesNotExist:
            return JsonResponse({"Error":"Does not Exist"})
    else:
        try:
            content = json.loads(request.body)
            SalesPerson.objects.filter(id=id).update(**content)
            salesperson = SalesPerson.objects.get(id=id)
            return JsonResponse(
                salesperson,
                encoder = SalesPersonEncoder,
                safe=False
            )
        except:
            return JsonResponse({"Error":"Should only contain name and employee_number keys"})

@require_http_methods(["GET", "POST"])
def api_customers(request):
    if request.method == "GET":
        response = Customer.objects.all()
        return JsonResponse(
            {"customers":response},
            encoder = CustomerListEncoder
        )
    else:
        try:
            content = json.loads(request.body)
            response = Customer.objects.create(**content)
            return JsonResponse(
                response,
                encoder=CustomerListEncoder,
                safe=False,
        )
        except:
            response = JsonResponse(
                {"message": "Could not create this customer"}
                )
            response.status_code = 400
            return response

@require_http_methods(["GET", "DELETE", "PUT"])
def api_customer(request, id):
    if request.method == "GET":
        try:
            customer = Customer.objects.get(id=id)
            return JsonResponse(
                customer,
                encoder=CustomerDetailEncoder,
                safe=False
            )
        except Customer.DoesNotExist:
            response = JsonResponse({"message":"This person does not exist or has been deleted, check ID"})
            response.status_code = 404
            return response
    elif request.method == "DELETE":
        try:
            customer = Customer.objects.get(id=id)
            customer.delete()
            return JsonResponse(
                {"Deletion":"Successful"},
                safe=False
            )
        except Customer.DoesNotExist:
            return JsonResponse({"Error":"Does not Exist"})
    else:
        try:
            content = json.loads(request.body)
            Customer.objects.filter(id=id).update(**content)
            customer = Customer.objects.get(id=id)
            return JsonResponse(
                customer,
                encoder = CustomerDetailEncoder,
                safe=False
            )
        except:
            return JsonResponse({"Error":"Should only contain name, address, and phone_number keys"})
