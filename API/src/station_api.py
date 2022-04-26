import json
import urllib.request

from flask import jsonify
from flask_restful import Resource
from flasgger.utils import swag_from


def get_stations() -> [dict]:
    url: str = "https://api.irail.be/stations/?format=json&lang=en"

    response = urllib.request.urlopen(url)
    unpacked_data = json.loads(response.read())
    ret_val: [dict] = []

    stations: [dict] = unpacked_data["station"]
    stations.sort(key=lambda x: x["name"], reverse=False)
    for elem in stations:
        elem_form: dict = dict()
        elem_form["Name"] = elem["name"]
        elem_form["StandardName"] = elem["standardname"]
        elem_form["ID"] = elem["id"]
        elem_form["LocationX"] = elem["locationX"]
        elem_form["LocationY"] = elem["locationY"]

        ret_val.append(elem_form)

    return ret_val


class StationsList(Resource):
    @swag_from("Documentation/station_api_doc.yml")
    def get(self):
        return jsonify(get_stations())
