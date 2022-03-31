import React from "react";
import axios from "axios";
import {BrowserRouter, Routes, Route} from "react-router-dom";

import NavigationBar from "./Components/NavigationBar";
import Homepage from "./Components/Homepage";
import StationPage from "./Components/StationPage";
import RoutingPage from "./Components/RoutingPage"

class App extends React.Component {
  constructor(props) {
    super(props);

    axios.get("/api").then(response => {
      console.log(response.data)
    }).catch(error => {
      console.log("Connection failed: " + error)
    })

  }

  render() {
    return (
      <BrowserRouter>
        <NavigationBar/>
        <Routes>
          <Route path={"/"} element={<Homepage/>}/>
          <Route path={"/stations"} element={<StationPage/>} />
          <Route path={"/routing"} element={<RoutingPage/>} />
        </Routes>
      </BrowserRouter>
    )
  }
}

export default App;
