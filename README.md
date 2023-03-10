# CarCar

Team:

* Shaun Ragasa - Services Microservice
* Tahmid Baro Bhuiyan- Sales Microservice

## Design

## Service microservice

The bounded contexts for this microservice were the Inventory Context and the Services Context.

Services contains the following models:
[ManufacturerVO, VehicleModelVO, AutomobileVO, Technician, Status, ServiceAppointment]

ManufacturerVO, VehicleModelVO, and AutomobileVO all had identical properties to the original model, except that their get_api_url method was replaced with an equivalent import_href property.

Technician:
  - employee_num was set to a positive integer field because employee numbers should only be positive. It also was set to unique=True because no two employees should share the same number.

ServiceAppointment:
  - vin was not set to unique=True because the same car can have several appointments. It was not a foreignkey to the AutomobileVO because automobiles from other dealerships can come for a service appointment.
  - an "IN PROGRESS" status is given to every appointment on creation by default, but can be changed with the finish and cancel methods.

ManufacturerVO, VehicleModelVO, and AutomobileVO are polled with their Inventory Microservice model counterpart. This service specifically integrates with the inventory microservice through the interaction of the AutomobileVO and ServiceAppointment models. The ServiceAppointment VIP property's value is determined by whether the ServiceAppointment instance's VIN can be found within the list of all AutomobileVO instances (i.e., if an automobile was purchased through our own dealership and inventory, service appointments for that automobile are considered VIP).

## Sales microservice

Sales contains the following models:
[SalesPerson, Customer, ManufacturerVO, VehicleModelVO, AutomobileVO, SalesRecord]

[ManufacturerVO, VehicleModelVO,  AutomobileVO]
The following are not models with which we manually create instances. They inherit the properties of their parent model which exists within the Inventory microservice, and the instances are automatically created based on the poll set up, which regularly checks the database for new or revised instances of the three parent models.

[SalesPerson,  Customer]
The following are simple models that only contain the name of the individuals, as well as 1 or 2 elements that can be used to identify different customers or salespeople. They are mainly to be used in conjunction with the creation of salesrecords.

[Sales Record]
The following is a model that contains every instance of a transaction made between a SalesPerson and a Customer for the purchase of an AutomobileVO. VehicleModelVO and ManufacturerVO are not directly contained within each instance of a sales record, instead each instance of an AutomobileVO contains elements that are foreign keys to the two models.

The primary features of this microservice's front-end are to create new sales records and display a list - while also allowing the possibility of filtering the displayed list by sales person. Additional features which compliment the primary features include adding new customers and salespeople, which can then be accessible via a drop-down bar when creating new sales. Since the Inventory microservice has its own feature which allows the users to create new automobiles, the drop-down menu for selecting the purchased automobile within the 'Create a Sales Record' feature automatically populates based on how many automobiles exist within the Inventory database due to the poll system.
