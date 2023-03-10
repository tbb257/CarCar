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

The VO objects are populated automatically through the poll set up for the sales api, and are value objects of the parent models' instances, which are coming from the inventory database. These VO's are then used in conjunction with our SalesPerson, Customer and SalesRecord instances to create functional features on the front-end side, such as creating/showing sales, creating customers and salespeople, and filtering through sales by the respective salesperson.

The front-end for creating salespeople, salesrecords and customers function by fetching to the URL path declared in the back-end and matching up the input provided on the front-end to verify that the attributes are compatible. Similarly, the list features consist of JSX that is automatically populated based on a fetch to the list of instances in the database.
