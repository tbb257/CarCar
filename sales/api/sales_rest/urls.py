from django.urls import path
from .views import api_salesperson, api_salespeople, api_customers, api_customer, api_sales, api_sale

urlpatterns = [
    path("salesperson/", api_salespeople, name="api_salespeople"),
    path("salesperson/<int:id>/", api_salesperson, name="api_salesperson"),
    path("customers/", api_customers, name="api_customers"),
    path("customers/<int:id>/", api_customer, name="api_customer"),
    path("sales/", api_sales, name="api_sales"),
    path("sales/<int:id>/", api_sale, name="api_sale"),
]
