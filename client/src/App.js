import React from "react";
import { Route, NavLink } from "react-router-dom";

import Registration from "./components/Registration";
import LoginForm from "./components/LoginForm";
import Dashboard from "./components/Dashboard";

import "./App.css";

function App() {
  return (
    <div className="App">
      <nav>
        <div className="logo-container">
          <h2>This is a Logo</h2>
        </div>
        <div className="links-container">
          <NavLink to="/users">Home</NavLink>
          <NavLink to="/signin">Login</NavLink>
          <NavLink to="/signin">Logout</NavLink>
        </div>
      </nav>

      <Route exact path="/signup" component={Registration} />
      <Route exact path="/signin" component={LoginForm} />
      <Route exact path="/users" component={Dashboard} />
    </div>
  );
}

export default App;
