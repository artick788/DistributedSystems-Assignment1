import React from "react";
import "./SelectStationBar.css"
import store from "../Store/Store";
import {getStationInfo} from "../Station";
import {Button, Divider, List, ListItem, Typography} from "@material-ui/core";

export default class SelectStationBar extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            selectedStation: -1
        }
    }


    render() {
        if (!store.getState().stations){
            getStationInfo();
            return null;
        }
        else{
            return (
                <div className={"BarStyle"}>
                    <List>
                        <ListItem>
                            <Typography variant="h6">
                                {this.props.title}
                            </Typography>
                        </ListItem>
                        <ListItem>
                            <Typography variant="h6" style={{color: "#000000"}}>
                                {store.getState().stationNames[this.state.selectedStation]}
                            </Typography>
                        </ListItem>
                        <Divider/>
                    </List>
                    <div className={"ScrollBarStyle"}>
                        <List>
                            {
                                store.getState().stations.map(
                                    station => {
                                        const stName = station.m_Name;
                                        return (
                                            <ListItem>
                                                <Button className="ButtonStyle" onClick={() => {
                                                    this.setState({...this.state, selectedStation: station.m_ElementID}, () => {
                                                        this.props.selectedCallback(this.state.selectedStation);
                                                    })
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
                    </div>

                </div>
            )
        }
    }
}