import axios from "axios";
import React from "react";
import store from "./Store/Store";


export class Station{
    constructor(elementID, name, id, standardName, locX, locY) {
        this.m_Name = name;
        this.m_ID = id;
        this.m_StandardName = standardName;
        this.m_LocationX = locX;
        this.m_LocationY = locY;
        this.m_ElementID = elementID;
    }

    renderStationOverview(){
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

export function getStationInfo(){
    let tempStations = [];
    let tempNames = [];
    axios.get("/api/stations").then(response => {
        response.data.map((st, num) => {
            const name = st.Name;
            const standardName = st.StandardName;
            const id = st.ID;
            const locX = st.LocationX;
            const locY = st.LocationY;

            const station = new Station(num, name, id, standardName, locX, locY);
            tempStations.push(station)
            tempNames.push(name);
        })

        store.dispatch({type: "stations", value: tempStations});
        store.dispatch({type: "stationNames", value: tempNames});

    }).catch(
        error => {
            console.log(error);
        }
    )
}