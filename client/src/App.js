import './App.css';
import React from "react";
import { Route } from "react-router-dom";
import LandingPage from "./components/LandingPage.jsx";
import Home from "./components/Home.jsx";
import NavBar from "./components/NavBar.jsx";

const App = () => {
  return (
    <div className="App">
      <Route exact path="/" component={LandingPage} />
      <Route path="/home" component={NavBar} />
      <Route exact path="/home" component={Home} />
    </div>
  );
}

export default App;
