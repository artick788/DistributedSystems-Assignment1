from flask import Flask
from flasgger import Swagger
from flask_restful import Api
from flask_cors import CORS
from .base_api import Time, HelloNMBS
from .station_api import *
from .routing_api import NmbsRouter


def create_app() -> Flask:
    app: Flask = Flask(__name__)
    api = Api(app)
    CORS(app)
    Swagger(app)

    api.add_resource(Time, "/")
    api.add_resource(HelloNMBS, "/api")

    api.add_resource(StationsList, "/api/stations")
    api.add_resource(NmbsRouter, "/api/stations/<from_station>/<to_station>")

    return app
