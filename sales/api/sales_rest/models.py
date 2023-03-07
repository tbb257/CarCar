from django.db import models
from django.urls import reverse

class SalesPerson(models.Model):
    name = models.CharField(max_length=100)
    employee_number = models.IntegerField()
    def __str__(self):
        return self.name

class Customer(models.Model):
    name = models.CharField(max_length=100)
    address = models.CharField(max_length=200, null=True)
    phone_number = models.CharField(max_length=100)

    def __str__(self):
        return self.name


class ManufacturerVO(models.Model):
    name = models.CharField(max_length=100, unique=True)
    import_href = models.CharField(max_length=200)

    def get_api_url(self):
        return reverse("api_manufacturer", kwargs={"pk": self.id})
    def __str__(self):
        return self.name

class VehicleModelVO(models.Model):
    name = models.CharField(max_length=100)
    picture_url = models.URLField()
    import_href = models.CharField(max_length=200)

    manufacturer = models.ForeignKey(
        ManufacturerVO,
        related_name="models",
        on_delete=models.CASCADE,
    )

    def get_api_url(self):
        return reverse("api_vehicle_model", kwargs={"pk": self.id})
    def __str__(self):
        return self.name

class AutomobileVO(models.Model):
    color = models.CharField(max_length=50)
    year = models.PositiveSmallIntegerField()
    vin = models.CharField(max_length=17, unique=True)
    import_href = models.CharField(max_length=200)

    model = models.ForeignKey(
        VehicleModelVO,
        related_name="automobiles",
        on_delete=models.CASCADE,
    )

    def get_api_url(self):
        return reverse("api_automobile", kwargs={"vin": self.vin})
    def __str__(self):
        return self.vin

class SalesRecord(models.Model):
    automobile = models.ForeignKey(
        AutomobileVO,
        related_name = "salesrecord",
        on_delete = models.CASCADE
    )
    salesperson = models.ForeignKey(
        SalesPerson,
        related_name = "salesrecord",
        on_delete = models.CASCADE
    )
    customer = models.ForeignKey(
        Customer,
        related_name = "salesrecord",
        on_delete = models.CASCADE
    )
    price = models.IntegerField()

    def __str__(self):
        return f"SalesPerson - {self.salesperson} / Customer - {self.customer} / Price - {self.price}"
