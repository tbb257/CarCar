from django.contrib import admin
from .models import ManufacturerVO, VehicleModelVO, AutomobileVO, SalesRecord, SalesPerson, Customer

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

@admin.register(SalesRecord)
class SalesRecordAdmin(admin.ModelAdmin):
    pass


@admin.register(SalesPerson)
class SalesPersonAdmin(admin.ModelAdmin):
    pass

@admin.register(Customer)
class CustomerAdmin(admin.ModelAdmin):
    pass
