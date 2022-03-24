import React from "react";
import Sidebar from "./Utils/SideBar";
import axios from "axios";
import "./StationPage.css";
import ReactTable from "react-table"
import {Button, Divider, List, ListItem, Typography} from "@material-ui/core";

class Station{
    constructor(elementID, name, id, standardName, locX, locY) {
        this.m_Name = name;
        this.m_ID = id;
        this.m_StandardName = standardName;
        this.m_LocationX = locX;
        this.m_LocationY = locY;
        this.m_ElementID = elementID;
    }

    onRender(){
        return (
            <table>
                <th>
                    <tr>Name</tr>
                    <tr>Standard Name</tr>
                    <tr>ID</tr>
                    <tr>X coördinaat</tr>
                    <tr>Y coördinaat</tr>
                </th>
                <th>
                    <tr>{this.m_Name}</tr>
                    <tr>{this.m_StandardName}</tr>
                    <tr>{this.m_ID}</tr>
                    <tr>{this.m_LocationX}</tr>
                    <tr>{this.m_LocationY}</tr>
                </th>
            </table>
        )
    }
}

export default class StationPage extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            stations: [],
            selectedStation: -1
        }

        this.getStations();


    }

    getStations(){
        let stations = [];
        axios.get("/api/stations").then(response => {
            response.data.map((st, num) => {
                const name = st.Name;
                const standardName = st.StandardName;
                const id = st.ID;
                const locX = st.LocationX;
                const locY = st.LocationY;

                const station = new Station(num, name, id, standardName, locX, locY);
                stations.push(station)
            })

            this.setState({stations: stations, selectedStation: this.state.selectedStation});
            this.forceUpdate();

        }).catch(
            error => {
                console.log(error);
            }
        )
    }

    renderStationInfo(){
        if (this.state.selectedStation !== -1){
            return (
                <div style={{
                    position: "absolute",
                    left: "50%",
                    top: "50%"
                }}>
                    {
                        this.state.stations[this.state.selectedStation].onRender()
                    }
                </div>
            )
        }
        else {
            return <></>
        }
    }

    render() {
        if (this.state.stations.length === 0) {
            this.getStations();
            return null;
        }
        else {
            return (
                <div >
                    <Sidebar>
                        <List>
                            <ListItem>
                                <Typography variant="h6">
                                    Stations
                                </Typography>
                            </ListItem>
                            <Divider/>
                            {
                                this.state.stations.map(
                                    station => {
                                        const stName = station.m_Name;
                                        return (
                                            <ListItem>
                                                <Button className="ButtonStyle" onClick={() => {
                                                    this.setState({...this.state, selectedStation: station.m_ElementID})
                                                }}>
                                                    {
                                                        stName
                                                    }
                                                </Button>
                                            </ListItem>
                                        )
                                    }
                                )
                            }
                        </List>
                    </Sidebar>
                    {
                        this.renderStationInfo()
                    }
                </div>
            )
        }
    }
}