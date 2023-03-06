from django.db import models


class ManufacturerVO(models.Model):
    name = models.CharField(max_length=100, unique=True)
    import_href = models.CharField(max_length=150)

    def __str__(self):
        return self.name


class VehicleModelVO(models.Model):
    name = models.CharField(max_length=100)
    picture_url = models.URLField()
    import_href = models.CharField(max_length=150)

    manufacturer = models.ForeignKey(
        ManufacturerVO,
        related_name="models",
        on_delete=models.CASCADE,
    )

    def __str__(self):
        return self.name


class AutomobileVO(models.Model):
    color = models.CharField(max_length=50)
    year = models.PositiveSmallIntegerField()
    vin = models.CharField(max_length=17, unique=True)
    import_href = models.CharField(max_length=150)

    model = models.ForeignKey(
        VehicleModelVO,
        related_name="automobiles",
        on_delete=models.CASCADE,
    )

    def __str__(self):
        return self.vin


class Technician(models.Model):
    name = models.CharField(max_length=100)
    employee_num = models.PositiveIntegerField()

    def __str__(self):
        return f"{self.name} | {self.employee_num}"


class ServiceAppointment(models.Model):
    vin = models.CharField(max_length=17)
    owner_name = models.CharField(max_length=100)
    reason = models.TextField()
    date_time = models.DateTimeField()

    technician = models.ForeignKey(
        Technician,
        related_name="appointments",
        on_delete=models.PROTECT,
    )

    def __str__(self):
        return f"VIN:{self.vin}, WHEN:{self.date_time}, TECH:{self.technician}"
