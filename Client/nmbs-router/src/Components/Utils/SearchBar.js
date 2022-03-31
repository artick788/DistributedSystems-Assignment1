import React from "react";
import axios from "axios";
import "./SearchBar.css"
import {TextField} from "@material-ui/core";

export default class SearchBar extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            inputText: ""
        }


        console.log(props.searchData);

    }

    render(){
        return (
            <form action="/" method="get">
                <label htmlFor="header-search">
                    <span className="visually-hidden">Search blog posts</span>
                </label>
                <input
                    type="text"
                    id="header-search"
                    placeholder="Search blog posts"
                    name="s"
                />
                <button type="submit">Search</button>
            </form>
        )
    }


}

