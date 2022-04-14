import json
import urllib.request

from flask import jsonify
from flask_restful import Resource

from .connection_resource import ConnectionResource
from .station_api import get_stations


class Via:
    def __init__(self, name: str, location_x: str, location_y: str):
        self.__name: str = name
        self.__location_x: str = location_x
        self.__location_y: str = location_y

    def to_dict(self):
        ret_val: dict = dict()
        ret_val["Name"] = self.__name
        ret_val["LocationX"] = self.__location_x
        ret_val["LocationY"] = self.__location_y

        return ret_val


class Route:
    def __init__(self, from_station: str, to_station: str):
        self.__from_station_name: str = from_station
        self.__to_station_name: str = to_station

        self.__from_station_via: Via = None
        self.__to_station_via: Via = None

        self.__route: [Via] = []

        self.__duration: int = 0

    def __get_begin_end_station_as_via(self):
        station_list: [dict] = get_stations()
        for station in station_list:
            name: str =  station["Name"]
            if name == self.__from_station_name:
                self.__from_station_via = Via(name, station["LocationX"], station["LocationY"])
            elif name == self.__to_station_name:
                self.__to_station_via = Via(name, station["LocationX"], station["LocationY"])

    def calculate_route(self, nmbs_base_url: str):
        self.__get_begin_end_station_as_via()
        self.__route.append(self.__from_station_via)

        conn_res: ConnectionResource = ConnectionResource(self.__from_station_name, self.__to_station_name)
        url: str = nmbs_base_url + conn_res.format_uri()
        response = urllib.request.urlopen(url)
        unpacked_data = json.loads(response.read())

        self.__duration = int(unpacked_data["connection"][0]["duration"])

        nmbs_connection: dict = unpacked_data["connection"][0]

        if "vias" in nmbs_connection:
            nmbs_route = unpacked_data["connection"][0]["vias"]["via"]
            for elem in nmbs_route:
                name: str = elem["station"]
                loc_x: str = elem["stationinfo"]["locationX"]
                loc_y: str = elem["stationinfo"]["locationY"]
                via: Via = Via(name, loc_x, loc_y)
                self.__route.append(via)

        self.__route.append(self.__to_station_via)

    def to_dict(self):
        ret_val: dict = dict()
        ret_val["Success"] = "false"
        if len(self.__route) > 0:
            ret_val["Success"] = "true"
            ret_val["Duration"] = str(self.__duration)

            i_route: [dict] = []
            for elem in self.__route:
                i_route.append(elem.to_dict())

            ret_val["Route"] = i_route

        return ret_val


class NmbsRouter(Resource):
    def get(self, from_station: str, to_station: str):
        url: str = "https://api.irail.be"

        i_route: Route = Route(from_station, to_station)
        i_route.calculate_route(url)

        return jsonify(i_route.to_dict())
