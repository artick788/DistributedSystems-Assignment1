import "./SideBar.css"
import {Box} from "@material-ui/core";
import React from "react";

export default class Sidebar extends React.Component{
    constructor(props) {
        super(props);
    }

    render() {
        return (
        <div className={"SideBarStyle"}>
            <Box className={"BoxStyle"}>
                {this.props.children}
            </Box>
        </div>
    )
    }
}