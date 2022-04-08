import React from "react";
import axios from "axios";
import {BrowserRouter, Routes, Route} from "react-router-dom";

import NavigationBar from "./Components/NavigationBar";
import Homepage from "./Components/Homepage";
import StationPage from "./Components/StationPage";
import RoutingPage from "./Components/RoutingPage"
import store from "./Components/Store/Store"
import {Provider} from 'react-redux'
import {getStationInfo} from "./Components/Station";

class App extends React.Component {
    constructor(props) {
        super(props);

        axios.get("/api").then(response => {
            console.log(response.data)
        }).catch(error => {
            console.log("Connection failed: " + error)
        })

        getStationInfo();

    }

    render() {
        return (
            <BrowserRouter>
                <Provider store={store}>
                    <NavigationBar/>
                    <Routes>
                        <Route path={"/"} element={<Homepage/>}/>
                        <Route path={"/stations"} element={<StationPage/>} />
                        <Route path={"/routing"} element={<RoutingPage/>} />
                    </Routes>
                </Provider>
            </BrowserRouter>
        )
    }
}

export default App;
