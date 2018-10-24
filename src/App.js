import React, { Component } from "react";
import "./App.css";
import Home from "./components/Home";
// import withAuthenticator from "@aws-amplify/auth";

class App extends Component {
  render() {
    return (
      <div>
        <Home />
      </div>
    );
  }
}

export default App;
