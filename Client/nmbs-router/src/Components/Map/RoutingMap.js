import React from "react";
import "mapbox-gl/dist/mapbox-gl.css"
import mapboxgl from "mapbox-gl"
import store from "../Store/Store";
import "./RoutingMap.css"
import axios from "axios";
import {Button, List, ListItem, Typography} from "@material-ui/core";


const token = "pk.eyJ1IjoicHBwYzEzMTIiLCJhIjoiY2wxNTk0dGR0MHl6NzNkczBxNzRxbTczNSJ9.qFzM1Q2oov0E6rFbDodAdQ";
mapboxgl.accessToken = token;

export default class RoutingMap extends React.PureComponent{
    constructor(props) {
        super(props);

        this.state = {
            longitude: 4.402580,
            latitude: 51.217616,
            zoom: 8,
            route: [],
            visitedStations: [],
            trainDuration: 0,
            autoDuration: 0
        }

        this.mapContainer = React.createRef();
        this.map = React.createRef();
    }

    calculateRoute(){
        if (store.getState().fromStation !== null && store.getState().toStation !== null){
            const fromName = store.getState().fromStation.m_Name
            const toName = store.getState().toStation.m_Name
            const uri = "/api/stations/" + fromName + "/" + toName
            axios.get(uri).then(response => {
                if (response.data.Success === "true"){
                    const route = response.data.Route;
                    let tempLocs = [];
                    let tempVisited = [];

                    for (let i = 0; i < route.length; i++){
                        const pos = [route[i].LocationX, route[i].LocationY]
                        tempLocs.push(pos)
                        tempVisited.push(route[i].Name);
                    }

                    this.setState({...this.state, route: tempLocs, trainDuration: response.data.Duration})
                }
            }).catch( error => { console.log(error)} )

        }
    }

    setMapLayer(coordinates, id, lineColor){
        const config = {
                type: 'Feature',
                properties: {},
                geometry: {
                    type: 'LineString',
                    coordinates: coordinates,
                }
            }

            if (this.map.getSource(id)){
                this.map.getSource(id).setData(config)
            }
            else{
                this.map.addLayer({
                    id: id,
                    type: 'line',
                    source: {
                        type: 'geojson',
                        data: config,
                    },
                    layout: {
                        'line-join': 'round',
                        'line-cap': 'round'
                    },
                    paint: {
                        'line-color': lineColor,
                        'line-width': 5,
                        'line-opacity': 0.75
                    }
                });
            }
    }

    routeTrain(){
        if (this.state.route.length !== 0){
            this.setMapLayer(this.state.route, 'train', '#FF4500')
        }
    }

    async routeAuto(){
        if (this.state.route.length !== 0){
            let url = "https://api.mapbox.com/directions/v5/mapbox/driving/"
            url += store.getState().fromStation.m_LocationX.toString() + "," + store.getState().fromStation.m_LocationY.toString() + ";";
            url += store.getState().toStation.m_LocationX.toString() + "," + store.getState().toStation.m_LocationY.toString();
            url += "?alternatives=false&geometries=geojson&overview=full&steps=false&access_token=" + token;

            let query = await axios({
                method: 'get',
                url: url
            }).then((response) => {
                if (response.data.routes.length > 0){
                    const duration = response.data.routes[0].duration;
                    this.setState({...this.state, autoDuration: duration});
                }
                return response.data;
            }).catch((e) => {
                console.warn(e);
            })

            const temp = await query;
            const data = temp.routes[0];

            this.setMapLayer(data.geometry.coordinates, 'auto', '#000000');

        }
    }

    componentDidMount() {
        this.map = new mapboxgl.Map({
            container: this.mapContainer.current,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [this.state.longitude, this.state.latitude],
            zoom: this.state.zoom,
        });

        this.map.on('move', () => {
            this.setState({
                ...this.state,
                longitude: this.map.getCenter().lng.toFixed(4),
                latitude: this.map.getCenter().lat.toFixed(4),
                zoom: this.map.getZoom().toFixed(2)
            });
        });
    }

    renderRouteInfo(){
        if (this.state.route.length !== 0){
            return (
                <div>
                    <table>
                        <tr>
                            <th> Transport Type </th>
                            <th> By Auto </th>
                            <th> By Train </th>
                        </tr>
                        <tr>
                            <td> Map route color </td>
                            <td> Black </td>
                            <td> Orange </td>
                        </tr>
                        <tr>
                            <td> Duration </td>
                            <td> {new Date(this.state.autoDuration * 1000).toISOString().substr(11, 8)} </td>
                            <td> {new Date(this.state.trainDuration * 1000).toISOString().substr(11, 8)} </td>
                        </tr>
                    </table>
                </div>
            )
            // return (
            //     <List>
            //         <ListItem>
            //             <Typography variant="h6">
            //                 Train Duration: {new Date(this.state.trainDuration * 1000).toISOString().substr(11, 8)}
            //             </Typography>
            //         </ListItem>
            //         <ListItem>
            //             <Typography variant="h6">
            //                 Auto Duration: {new Date(this.state.autoDuration * 1000).toISOString().substr(11, 8)}
            //             </Typography>
            //         </ListItem>
            //         <ListItem>
            //             <Typography variant="h6">
            //                 Train Route: Orange
            //             </Typography>
            //         </ListItem>
            //          <ListItem>
            //             <Typography variant="h6">
            //                Auto Route: Black
            //             </Typography>
            //         </ListItem>
            //     </List>
            // )
        }
        else{
            return null;
        }

    }

    render() {
        this.routeTrain();
        this.routeAuto();
        return (
            <div>
                <div className={"RoutingButton"}>
                    <Button variant="contained" style={{color: "orangered"}} onClick={() => {
                        this.calculateRoute();
                    }}>
                        Calculate Route
                    </Button>
                </div>
                <div className="MapInfoBar">
                    Longitude: {this.state.longitude} | Latitude: {this.state.latitude} | Zoom: {this.state.zoom}
                </div>
                <div ref={this.mapContainer} className="BarStyle MapContainer" />
                {
                    this.renderRouteInfo()
                }
            </div>
        )
    }

}
