import React, {useRef, useEffect, useState} from "react";
import "mapbox-gl/dist/mapbox-gl.css"
import mapboxgl from "mapbox-gl"
import store from "../Store/Store";
import "./Map.css"
import axios from "axios";

mapboxgl.accessToken = "pk.eyJ1IjoicHBwYzEzMTIiLCJhIjoiY2wxNTk0dGR0MHl6NzNkczBxNzRxbTczNSJ9.qFzM1Q2oov0E6rFbDodAdQ";

export default function Map(){
    const mapContainer = useRef(null)
    const map = useRef(null)
    const [lng, setLng] = useState(4.402580);
    const [lat, setLat] = useState(51.217616);
    const [zoom, setZoom] = useState(9);

    const route = [
            [4.421101, 51.2172],
            [2.925809, 51.228212]
        ]

    useEffect(() => {
        if (map.current) return;
        map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [lng, lat],
            zoom: zoom,
        });
    });

    useEffect(() => {
        if (!map.current) return;
        map.current.on('move', () => {
            setLng(map.current.getCenter().lng.toFixed(4));
            setLat(map.current.getCenter().lat.toFixed(4));
            setZoom(map.current.getZoom().toFixed(2));
        })
    })

    function routeTrain(){
        const geojson = {
            type: 'Feature',
            properties: {},
            geometry: {
              type: 'LineString',
              coordinates: route,
            }
        }

        if (map.current.getSource('train')){
            map.current.getSource('train').setData(geojson)
        }
        else{
            map.current.addLayer({
                id: 'train',
                type: 'line',
                source: {
                    type: 'geojson',
                    data: geojson,
                },
                layout: {
                    'line-join': 'round',
                    'line-cap': 'round'
                },
                paint: {
                    'line-color': '#FF4500',
                    'line-width': 5,
                    'line-opacity': 0.75
                }
            });
        }

    }

    // routeTrain();

    async function routeAuto() {
        let query = await axios({
            method: 'get',
            url: `https://api.mapbox.com/directions/v5/mapbox/driving/${route[0][0]},${route[0][1]};${route[1][0]},${route[1][1]}?alternatives=false&geometries=geojson&overview=full&steps=false&access_token=pk.eyJ1IjoicHBwYzEzMTIiLCJhIjoiY2wxNTk0dGR0MHl6NzNkczBxNzRxbTczNSJ9.qFzM1Q2oov0E6rFbDodAdQ`,
        }).then((response) => {
            return response.data;
        }).catch((e) => {
            console.warn(e)
        });
        console.log("got directions from mapbox")
        const json = await query;
        const data = json.routes[0];

        const geojson = {
            type: 'Feature',
            properties: {},
            geometry: {
              type: 'LineString',
              coordinates: data.geometry.coordinates,
            }
        }

        if (map.current.getSource('auto')){
            map.current.getSource('auto').setData(geojson)
        }
        else{
            map.current.addLayer({
                id: 'auto',
                type: 'line',
                source: {
                    type: 'geojson',
                    data: geojson,
                },
                layout: {
                    'line-join': 'round',
                    'line-cap': 'round'
                },
                paint: {
                    'line-color': '#FF4500',
                    'line-width': 5,
                    'line-opacity': 0.75
                }
            });
        }

    }

    routeAuto();

    return (
        <div>
            <div className="SideBar">
                Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
            </div>
            <div ref={mapContainer} className="BarStyle MapContainer" />
        </div>
    );
}
