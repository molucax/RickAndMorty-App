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
      <Route exact path="/home" component={Home} />
      <Route path="/home" component={NavBar} />
    </div>
  );
}

export default App;
