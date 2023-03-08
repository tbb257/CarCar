from django.db import models
from django.urls import reverse


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
    employee_num = models.PositiveIntegerField(unique=True)

    def __str__(self):
        return f"{self.name} | {self.employee_num}"

    def get_api_url(self):
        return reverse("api_detail_technicians", kwargs={"id": self.id})


class Status(models.Model):
    id = models.PositiveSmallIntegerField(primary_key=True)
    name = models.CharField(max_length=25, unique=True)

    def __str__(self):
        return self.name

    class Meta:
        ordering = ("id",)
        verbose_name_plural = "statuses"


class ServiceAppointment(models.Model):
    @classmethod
    def create(cls, **kwargs):
        kwargs["status"] = Status.objects.get(name="IN PROGRESS")
        serviceappointment = cls(**kwargs)
        serviceappointment.save()
        return serviceappointment

    vin = models.CharField(max_length=17)
    customer_name = models.CharField(max_length=100)
    reason = models.TextField()
    date = models.DateField()
    time = models.TimeField()
    vip = models.BooleanField(default=False)

    technician = models.ForeignKey(
        Technician,
        related_name="appointments",
        on_delete=models.PROTECT,
    )

    status = models.ForeignKey(
        Status,
        related_name="appointments",
        on_delete=models.PROTECT,
    )

    @classmethod
    def create(cls, **kwargs):
        kwargs["status"] = Status.objects.get(name="IN PROGRESS")
        serviceappointment = cls(**kwargs)
        serviceappointment.save()
        return serviceappointment

    def finish(self):
        status = Status.objects.get(name="FINISHED")
        self.status = status
        self.save()

    def cancel(self):
        status = Status.objects.get(name="CANCELLED")
        self.status = status
        self.save()

    def get_status(self):
        return self.status.name

    def __str__(self):
        return f"Appt: {self.id}, VIN: {self.vin}, Customer: {self.customer_name}"

    def get_api_url(self):
        return reverse("api_detail_appointments", kwargs={"id": self.id})
