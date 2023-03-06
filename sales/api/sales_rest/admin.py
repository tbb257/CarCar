from django.contrib import admin
from .models import ManufacturerVO, VehicleModelVO, AutomobileVO

# Register your models here.
@admin.register(ManufacturerVO)
class ManufacturerAdmin(admin.ModelAdmin):
    pass

@admin.register(VehicleModelVO)
class VehicleAdmin(admin.ModelAdmin):
    pass

@admin.register(AutomobileVO)
class AutomobileAdmin(admin.ModelAdmin):
    pass
