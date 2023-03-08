import django
import os
import sys
import time
import json
import requests

sys.path.append("")
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "service_project.settings")
django.setup()


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
            manufacturer = ManufacturerVO.objects.get(
                name=model["manufacturer"]["name"]
            )

            VehicleModelVO.objects.update_or_create(
                import_href=model["href"],
                defaults={
                    "name": model["name"],
                    "picture_url": model["picture_url"],
                    "manufacturer": manufacturer,
                },
            )

    def automobile_poll():
        data = requests.get("http://inventory-api:8000/api/automobiles/")
        autos = json.loads(data.content)

        for auto in autos["autos"]:
            model = VehicleModelVO.objects.get(name=auto["model"]["name"])

            AutomobileVO.objects.update_or_create(
                import_href=auto["href"],
                defaults={
                    "color": auto["color"],
                    "year": auto["year"],
                    "vin": auto["vin"],
                    "model": model,
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
        time.sleep(60)


if __name__ == "__main__":
    poll()
