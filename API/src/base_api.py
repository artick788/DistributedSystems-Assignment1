from flask_restful import Resource
from datetime import datetime
from flasgger.utils import swag_from
from flask import jsonify


class HelloNMBS(Resource):
    @swag_from("Documentation/base_api_hello_nmbs_doc.yml")
    def get(self):
        response: dict = dict()
        response["Message"] = "Welcome to the NMBS-router API"
        return jsonify(response)


class Time(Resource):
    @swag_from("Documentation/base_api_time_doc.yml")
    def get(self):
        now = datetime.now()
        t = now.strftime("%d %B %Y %A")
        response: dict = dict()
        response["Time"] = str(t)
        return jsonify(response)
