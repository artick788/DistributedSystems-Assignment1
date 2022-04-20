import React from "react";
import {Button, Divider, List, ListItem, Typography} from "@material-ui/core";
import "./Homepage.css"
import styled from "styled-components";
import {NavLink as Link} from "react-router-dom";

export const NavButtonLink = styled(Link)`
color: #000000;
display: flex;
align-items: center;
text-decoration: none;
padding: 0 1rem;
height: 100%;
cursor: pointer;
`;

export default class Homepage extends React.Component{
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className={"GreetingStyle"}>
                <List>
                    <ListItem>
                        <Typography variant="h6">
                            NMBS Router
                        </Typography>
                    </ListItem>
                    <Divider/>
                    <ListItem>
                        <Button className="ButtonStyle">
                            <NavButtonLink to="/stations" >
                                Stations
                            </NavButtonLink>
                        </Button>
                    </ListItem>
                    <ListItem>
                        <Button className="ButtonStyle">
                            <NavButtonLink to="/routing" >
                                Routing
                            </NavButtonLink>
                        </Button>
                    </ListItem>
                </List>
            </div>
        )
    }

}