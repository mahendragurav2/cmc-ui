import React, { Component } from "react";
import Coin from "./Coins";
import CoinsBarChart from "./CoinsBarChart";
class Coins extends Component {
  render() {
    return (
      <div>
        <div>
          <Coin />
        </div>
        <div>
          <CoinsBarChart />
        </div>
      </div>
    );
  }
}
export default Coins;
