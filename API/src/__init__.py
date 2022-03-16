from flask import Flask
from flasgger import Swagger
from flask_restful import Api
from flask_cors import CORS
from .nmbs_router_api import Time, HelloNMBS
from .Stations import *


def create_app() -> Flask:
    app: Flask = Flask(__name__)
    api = Api(app)
    CORS(app)
    Swagger(app)

    api.add_resource(Time, "/")
    api.add_resource(HelloNMBS, "/api")

    api.add_resource(StationsList, "/api/stations")

    return app
