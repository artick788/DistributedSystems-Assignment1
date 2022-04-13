from flask_restful import Resource
from datetime import datetime


class HelloNMBS(Resource):
    def get(self):
        return "<a>NMBS-Router</a>"


class Time(Resource):
    def get(self):
        now = datetime.now()
        t = now.strftime("%d %B %Y %A")
        return str(t)
