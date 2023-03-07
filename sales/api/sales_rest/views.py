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

class VehicleModelEncoder(ModelEncoder):
    model = VehicleModelVO
    properties = [
        "name",
        "picture_url",
        "import_href",
    ]

class AutomobileListEncoder(ModelEncoder):
    model = AutomobileVO
    properties = ["vin"]

class AutomobileDetailEncoder(ModelEncoder):
    model = AutomobileVO
    properties = [
        "model",
        "year",
        "vin",
        "import_href",
    ]
    encoders = {"model":VehicleModelEncoder()}

class SalesRecordListEncoder(ModelEncoder):
    model = SalesRecord
    properties = [
        "id",
        "salesperson",
        "customer",
        "price",
        "automobile"
    ]
    encoders = {
        "salesperson":SalesPeopleEncoder(),
        "customer":CustomerListEncoder(),
        "automobile":AutomobileListEncoder()
    }

class SalesRecordDetailEncoder(ModelEncoder):
    model = SalesRecord
    properties = [
        "id",
        "salesperson",
        "customer",
        "automobile",
        "price",
    ]
    encoders = {
        "salesperson":SalesPersonEncoder(),
        "customer":CustomerDetailEncoder(),
        "automobile": AutomobileDetailEncoder(),
    }

# Create your views here.
@require_http_methods(["GET", "POST"])
def api_salespeople(request):
    if request.method == "GET":
        response = SalesPerson.objects.all()
        return JsonResponse({"salesperson":response},encoder = SalesPeopleEncoder)
    else:
        try:
            content = json.loads(request.body)
            response = SalesPerson.objects.create(**content)
            return JsonResponse(response,encoder=SalesPersonEncoder,safe=False,)
        except:
            response = JsonResponse({"message": "Could not create this Salesperson"})
            response.status_code = 400
            return response

@require_http_methods(["GET", "DELETE", "PUT"])
def api_salesperson(request, id):
    if request.method == "GET":
        try:
            salesperson = SalesPerson.objects.get(id=id)
            return JsonResponse(salesperson,encoder=SalesPersonEncoder,safe=False)
        except SalesPerson.DoesNotExist:
            response = JsonResponse({"message":"This person does not exist or has been deleted, check ID"})
            response.status_code = 404
            return response
    elif request.method == "DELETE":
        try:
            salesperson = SalesPerson.objects.get(id=id)
            salesperson.delete()
            return JsonResponse({"Deletion":"Successful"},safe=False)
        except SalesPerson.DoesNotExist:
            return JsonResponse({"Error":"Does not Exist"})
    else:
        try:
            content = json.loads(request.body)
            SalesPerson.objects.filter(id=id).update(**content)
            salesperson = SalesPerson.objects.get(id=id)
            return JsonResponse(salesperson,encoder=SalesPersonEncoder,safe=False)
        except:
            return JsonResponse({"Error":"Should only contain name and employee_number keys"})

@require_http_methods(["GET", "POST"])
def api_customers(request):
    if request.method == "GET":
        response = Customer.objects.all()
        return JsonResponse({"customers":response},encoder = CustomerListEncoder)
    else:
        try:
            content = json.loads(request.body)
            response = Customer.objects.create(**content)
            return JsonResponse(response,encoder=CustomerListEncoder,safe=False,)
        except:
            response = JsonResponse({"message": "Could not create this customer"})
            response.status_code = 400
            return response

@require_http_methods(["GET", "DELETE", "PUT"])
def api_customer(request, id):
    if request.method == "GET":
        try:
            customer = Customer.objects.get(id=id)
            return JsonResponse(customer,encoder=CustomerDetailEncoder,safe=False)
        except Customer.DoesNotExist:
            response = JsonResponse({"message":"This person does not exist or has been deleted, check ID"})
            response.status_code = 404
            return response
    elif request.method == "DELETE":
        try:
            customer = Customer.objects.get(id=id)
            customer.delete()
            return JsonResponse({"Deletion":"Successful"},safe=False)
        except Customer.DoesNotExist:
            return JsonResponse({"Error":"Does not Exist"})
    else:
        try:
            content = json.loads(request.body)
            Customer.objects.filter(id=id).update(**content)
            customer = Customer.objects.get(id=id)
            return JsonResponse(customer,encoder = CustomerDetailEncoder,safe=False)
        except:
            return JsonResponse({"Error":"Should only contain name, address, and phone_number keys"})


@require_http_methods(["GET", "POST"])
def api_sales(request):
    if request.method == "GET":
        response = SalesRecord.objects.all()
        return JsonResponse({"sales":response},encoder=SalesRecordListEncoder, safe=False)
    else:
        content = json.loads(request.body)

        automobile = content["automobile"]
        salesperson = content["salesperson"]
        customer = content["customer"]
        try:
            automobileVO = AutomobileVO.objects.get(vin=automobile)
            salespersonVO = SalesPerson.objects.get(name=salesperson)
            customerVO = Customer.objects.get(name=customer)


            content["automobile"]=automobileVO
            content["salesperson"]=salespersonVO
            content["customer"]=customerVO
            sales = SalesRecord.objects.create(**content)
            return JsonResponse(sales, encoder=SalesRecordListEncoder, safe=False)
        except AutomobileVO.DoesNotExist:
            return JsonResponse({"error":"Make sure autombile is vin number, and check if Automobile vin exists"})
        except SalesPerson.DoesNotExist:
            return JsonResponse({"error":"Make sure salesperson is the name and check if SalesPerson exists"})
        except Customer.DoesNotExist:
            return JsonResponse({"error":"Make sure customer is the name and check if customer exists"})



@require_http_methods(["GET", "DELETE","POST"])
def api_sale(request, id):
    if request.method == "GET":
        response = SalesRecord.objects.get(id=id)
        return JsonResponse(response, encoder=SalesRecordDetailEncoder, safe=False)
    elif request.method == "DELETE":
        try:
            sale = SalesRecord.objects.get(id=id)
            sale.delete()
            return JsonResponse({"Deletion":"Successful"},safe=False)
        except SalesRecord.DoesNotExist:
            return JsonResponse({"Error":"Does not Exist"})
    else:
        try:
            content = json.loads(request.body)
            SalesRecord.objects.filter(id=id).update(**content)
            sale = SalesRecord.objects.get(id=id)
            return JsonResponse(sale,encoder = SalesRecordDetailEncoder,safe=False)
        except:
            return JsonResponse({"Error":"Try again"})
