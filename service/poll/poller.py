import django
import os
import sys
import time
import json
import requests

sys.path.append("")
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "service_project.settings")
django.setup()

# Import models from service_rest, here.
from service_rest.models import ManufacturerVO, VehicleModelVO, AutomobileVO


def get_manu_model_auto():
    def manufacturer_poll():
        data = requests.get("http://inventory-api:8000/api/manufacturers/")
        manufacturers = json.loads(data.content)

        for manufacturer in manufacturers["manufacturers"]:
            ManufacturerVO.objects.update_or_create(
                import_href=manufacturer["href"],
                defaults={"id": manufacturer["id"], "name": manufacturer["name"]},
            )

    def vehicle_model_poll():
        data = requests.get("http://inventory-api:8000/api/models/")
        models = json.loads(data.content)

        for model in models["models"]:
            VehicleModelVO.objects.update_or_create(
                import_href=model["href"],
                defaults={
                    "name": model["name"],
                    "picture_url": model["picture_url"],
                    "manufacturer_id": model["manufacturer_id"],
                },
            )

    def automobile_poll():
        data = requests.get("http://inventory-api:8000/api/automobiles/")
        autos = json.loads(data.content)

        for auto in autos["autos"]:
            AutomobileVO.objects.update_or_create(
                import_href=auto["href"],
                defaults={
                    "color": auto["color"],
                    "year": auto["year"],
                    "vin": auto["vin"],
                    "model_id": auto["model_id"],
                },
            )

    manufacturer_poll()
    vehicle_model_poll()
    automobile_poll()


def poll():
    while True:
        print("Service poller polling for data")
        try:
            get_manu_model_auto()
        except Exception as e:
            print(e, file=sys.stderr)
        time.sleep(10)


if __name__ == "__main__":
    poll()
