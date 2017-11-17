import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import ConNav from "./containers/ConNav";
import ConLogin from "./containers/ConLogin";
import ConSignup from "./containers/ConSignup";
import ConCart from "./containers/ConCart";
import Manage from "./pages/Manage";
import Home from "./pages/Home";
import User from "./pages/User";
import ConProduct from "./containers/ConProduct";
import "whatwg-fetch";

import "./App.css";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="body">
          <ConNav />

          <div style={{position: "absolute", top: 10, right: 400}}>
            <ConCart/>
          </div>
          <Switch>
            <Route path="/manage" component={Manage}/>
            <Route path="/signup" component={ConSignup}/>
            <Route path="/login" component={ConLogin}/>
            <Route path="/user" component={User}/>
            <Route path="/product/:id" component={ConProduct}/>
            <Route exact path="/" component={Home}/>
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
