import React from "react";
import Sidebar from "./Utils/SideBar";
import axios from "axios";
import {Divider, List, ListItem, Typography} from "@material-ui/core";

class Station{
    constructor(name, id, standardname, locX, locY) {
        this.m_Name = name;
        this.m_ID = id;
        this.m_StandardName = standardname;
        this.m_LocationX = locX;
        this.m_LocationY = locY;
    }
}

export default class StationPage extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            stations: []
        }

        this.getStations();


    }

    getStations(){
        let stations = [];
        axios.get("/api/stations").then(response => {
            response.data.map(st => {
                const name = st.Name;
                const standardName = st.StandardName;
                const id = st.ID;
                const locX = st.LocationX;
                const locY = st.LocationY;

                const station = new Station(name, id, standardName, locX, locY);
                stations.push(station)
            })

            this.setState({stations: stations});
            this.forceUpdate();

        }).catch(
            error => {
                console.log(error);
            }
        )
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
                                                <Typography variant="h6">
                                                    {
                                                        stName
                                                    }
                                                </Typography>
                                            </ListItem>
                                        )
                                    }
                                )
                            }
                        </List>
                    </Sidebar>
                </div>
            )
        }
    }
}