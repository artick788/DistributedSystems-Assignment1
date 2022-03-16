import json
import urllib.request

from flask import jsonify
from flask_restful import Resource


class StationsList(Resource):

    def get(self):
        url: str = "https://api.irail.be/stations/?format=json&lang=en"

        response = urllib.request.urlopen(url)
        unpacked_data = json.loads(response.read())
        ret_val: [dict] = []

        stations: [dict] = unpacked_data["station"]
        for elem in stations:
            elem_form: dict = dict()
            elem_form["Name"] = elem["name"]
            elem_form["StandardName"] = elem["standardname"]
            elem_form["ID"] = elem["id"]
            elem_form["LocationX"] = elem["locationX"]
            elem_form["LocationY"] = elem["locationY"]

            ret_val.append(elem_form)

        return jsonify(ret_val)
