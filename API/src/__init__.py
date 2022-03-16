from flask import Flask
from flasgger import Swagger
from flask_restful import Api
from flask_restful import Resource

class HelloNMBS(Resource):
    def get(self):
        return "NMBS app"


def create_app() -> Flask:
    app: Flask = Flask(__name__)
    api = Api(app)
    swag = Swagger(app)

    api.add_resource(HelloNMBS, "/api")

    return app