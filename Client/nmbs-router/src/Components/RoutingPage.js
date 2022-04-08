import React from "react";
import Sidebar from "./Utils/SideBar";
import SelectStationBar from "./Utils/SelectStationBar";
import axios from "axios";
import {Button, Divider, List, ListItem, Typography} from "@material-ui/core";
import "./RoutingPage.css"

export default class RoutingPage extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            selectedFromStation: -1,
            selectedToStation: -1
        }
    }

    render() {
        return (
            <div className={"Bars"}>
                <div className={"FromBar"}>
                    <SelectStationBar title={"From station"} selectedCallback={(selectedStation) => {

                    }}/>
                </div>
                <div className={"ToBar"}>
                    <SelectStationBar title={"To station"} selectedCallback={(selectedStation) => {
                        console.log(selectedStation);
                    }}/>
                </div>
            </div>
        )
    }
}