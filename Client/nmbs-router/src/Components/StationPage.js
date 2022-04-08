import React from "react";
import Sidebar from "./Utils/SideBar";
import axios from "axios";
import "./StationPage.css";
import {Button, Divider, List, ListItem, Typography} from "@material-ui/core";
import {getStationInfo, Station} from "./Station"
import SearchBar from "./Utils/SearchBar";
import store from "./Store/Store";


export default class StationPage extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            selectedStation: -1
        }

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
                        store.getState().stations[this.state.selectedStation].renderStationOverview()
                    }
                </div>
            )
        }
        else {
            return <></>
        }
    }

    render() {
        if (store.getState().stations.length === 0) {
            getStationInfo();
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
                                store.getState().stations.map(
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