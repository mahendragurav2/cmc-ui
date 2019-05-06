import React, { Component } from "react";
import { Route, NavLink, HashRouter } from "react-router-dom";
import Coins from "./components/analytics/Coins";
import Tokens from "./components/analytics/Tokens";
import Exchanges from "./components/analytics/Exchanges";
import Countries from "./components/analytics/Countries";

class Main extends Component {
  render() {
    return (
      <HashRouter>
        <div>
          <ul className="header">
            <li>
              <NavLink exact to="/">
                Coins
              </NavLink>
            </li>
            <li>
              <NavLink to="/tokens">Tokens</NavLink>
            </li>
            <li>
              <NavLink to="/exchanges">Exchanges</NavLink>
            </li>
            <li>
              <NavLink to="/countries">Countries</NavLink>
            </li>
          </ul>
          {/* <div className="tokens" /> */}
          <Route exact path="/" component={Coins} />
          <Route path="/tokens" component={Tokens} />
          <Route exact path="/exchanges" component={Exchanges} />
          <Route path="/countries" component={Countries} />
        </div>
      </HashRouter>
    );
  }
}

export default Main;