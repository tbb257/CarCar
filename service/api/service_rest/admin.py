from django.contrib import admin

from .models import ManufacturerVO, VehicleModelVO, AutomobileVO


@admin.register(ManufacturerVO)
class ManufacturerVOAdmin(admin.ModelAdmin):
    # list_display = "name"
    pass


@admin.register(VehicleModelVO)
class VehicleModelVOAdmin(admin.ModelAdmin):
    # list_display = ("name", "picture_url", "manufacturer")
    pass


@admin.register(AutomobileVO)
class AutomobileVOAdmin(admin.ModelAdmin):
    # list_display = ("color", "year", "vin")
    pass
