import React from "react";
import SelectStationBar from "./Utils/SelectStationBar";
import "./RoutingPage.css"
import store from "./Store/Store";
import RoutingMap from "./Map/RoutingMap"

export default class RoutingPage extends React.Component{
    constructor(props) {
        super(props);

    }

    render() {
        return (
            <div>
                <div className={"Bars"}>
                    <div>
                        <SelectStationBar title={"From station"} selectedCallback={(selectedStation) => {
                            store.dispatch({type: "fromStation", value: store.getState().stations[selectedStation]});
                        }}/>
                    </div>
                    <div>
                        <SelectStationBar title={"To station"} selectedCallback={(selectedStation) => {
                            store.dispatch({type: "toStation", value: store.getState().stations[selectedStation]});
                        }}/>
                    </div>

                    <RoutingMap/>
                </div>
            </div>
        )
    }
}