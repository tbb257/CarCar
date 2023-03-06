import django
import os
import sys
import time
import json
import requests

sys.path.append("")
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "sales_project.settings")
django.setup()

from sales_rest.models import ManufacturerVO, VehicleModelVO, AutomobileVO
# Import models from sales_rest, here.
# from sales_rest.models import Something

def poll():
    while True:
        print('Sales poller polling for data')
        try:
            manufacturerResp = requests.get("http://inventory-api:8000/api/manufacturers/")
            vehicleResp = requests.get("http://inventory-api:8000/api/models/")
            automobileResp = requests.get("http://inventory-api:8000/api/automobiles/")

            mContent = json.loads(manufacturerResp.content)
            vContent = json.loads(vehicleResp.content)
            aContent = json.loads(automobileResp.content)


            for manufacturer in mContent["manufacturers"]:
                ManufacturerVO.objects.update_or_create(
                    import_href = manufacturer["href"],
                    defaults = {"name":manufacturer["name"]}
                )
                print("Manufacturer is working")

            for vehicle in vContent["models"]:
                VehicleModelVO.objects.update_or_create(
                    import_href = vehicle["href"],
                    defaults = {
                    "name":vehicle["name"],
                    "picture_url":vehicle["picture_url"],
                    "manufacturer": ManufacturerVO.objects.get(name=vehicle["manufacturer"]["name"])
                    }
                )
                print("Vehicle is working")


            for automobile in aContent["autos"]:
                AutomobileVO.objects.update_or_create(
                    import_href = automobile["href"],
                    defaults = {
                    "color":automobile["color"],
                    "year":automobile["year"],
                    "vin":automobile["vin"],
                    "model": VehicleModelVO.objects.get(name=automobile["model"]["name"])
                    }
                )
                print("Automobile is working")

        except Exception as e:
            print(e, file=sys.stderr)
        time.sleep(60)


if __name__ == "__main__":
    poll()
