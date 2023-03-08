# CarCar

Team:

* Shaun Ragasa - Services Microservice
* Tahmid - Sales Microservice

## Design

## Service microservice

Explain your models and integration with the inventory
microservice, here.

## Sales microservice

Sales contains the following models:
[SalesPerson, Customer, ManufacturerVO, VehicleModelVO, AutomobileVO, SalesRecord]

The VO objects are populated automatically through the poll set up for the sales api, and are value objects of the parent models' instances, which are coming from the inventory database. These VO's are then used in conjunction with our SalesPerson, Customer and SalesRecord instances to create functional features on the front-end side, such as creating/showing sales, creating customers and salespeople, and filtering through sales by the respective salesperson.

The front-end for creating salespeople, salesrecords and customers function by fetching to the URL path declared in the back-end and matching up the input provided on the front-end to verify that the attributes are compatible. Similarly, the list features consist of JSX that is automatically populated based on a fetch to the list of instances in the database.
