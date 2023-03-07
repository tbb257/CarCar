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
