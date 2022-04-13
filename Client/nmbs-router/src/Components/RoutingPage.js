import React from "react";
import Sidebar from "./Utils/SideBar";
import SelectStationBar from "./Utils/SelectStationBar";
import axios from "axios";
import {Button, Divider, List, ListItem, Typography} from "@material-ui/core";
import "./RoutingPage.css"
import store from "./Store/Store";

export default class RoutingPage extends React.Component{
    constructor(props) {
        super(props);

    }

    calculateRoute(){
        if (store.getState().fromStation !== null && store.getState().toStation !== null){
            const fromName = store.getState().fromStation.m_Name
            const toName = store.getState().toStation.m_Name
            if (fromName !== toName){
                const uri = "/api/router/" + fromName + "/" + toName
                axios.get(uri).then(response => {
                    if (response.data.Success === "true"){
                        console.log(response.data.Route)
                    }
                }).catch(
                    error => {
                        console.log(error);
                    }
                )
            }
        }
    }

    render() {
        return (
            <div>
                <div className={"Bars"}>
                    <div className={"FromBar"}>
                        <SelectStationBar title={"From station"} selectedCallback={(selectedStation) => {
                            store.dispatch({type: "fromStation", value: store.getState().stations[selectedStation]});
                        }}/>
                    </div>
                    <div className={"ToBar"}>
                        <SelectStationBar title={"To station"} selectedCallback={(selectedStation) => {
                            store.dispatch({type: "toStation", value: store.getState().stations[selectedStation]});
                        }}/>
                    </div>
                </div>
                 <div className={"RoutingButton"}>
                    <Button variant="contained" style={{color: "orangered"}} onClick={() => {
                        this.calculateRoute();
                    }}>
                        Calculate Route
                    </Button>
                </div>
            </div>
        )
    }
}