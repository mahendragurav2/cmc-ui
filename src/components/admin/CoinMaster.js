import React, { Component } from "react";
import axios from "axios";

class CoinMaster extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cmData: []
    };
  }
  componentDidMount() {
    var url = new URL("http://localhost:4000/admin/coinmaster");
    axios
      .get(url, {
        params: {},
        headers: {
          "Content-Type": "application/json"
        }
      })
      .then(res => {
        this.setState({ cmData: res.data });
      });
  }
  buildHeader(rows) {
    let header = [];
    rows.map(row => {});
    return "";
  }
  buildBody(rows) {
    return "";
  }
  render() {
    const cmData = this.state.cmData;
    return <p>test</p>;
  }
}

export default CoinMaster;
