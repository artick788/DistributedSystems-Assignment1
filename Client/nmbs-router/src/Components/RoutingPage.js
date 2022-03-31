import React from "react";
import Sidebar from "./Utils/SideBar";
import axios from "axios";
import {Button, Divider, List, ListItem, Typography} from "@material-ui/core";

export default class RoutingPage extends React.Component{
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Typography variant="h6">
                Hello Routing
            </Typography>
        )
    }
}