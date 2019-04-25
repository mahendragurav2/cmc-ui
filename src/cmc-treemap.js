import React, { Component } from "react";
import data from "./data-treemap";
import TreeMap from "react-d3-treemap";
import "react-d3-treemap/dist/react.d3.treemap.css";
class CMCTreemap extends React.Component {
  render() {
    return (
      <div>
        <TreeMap
          height={500}
          width={1000}
          data={data}
          valueUnit={""}
          colorModel={1}
          bgColorRangeLow={"#00008B"}
          bgColorRangeHigh={"#F25820"}
        />
      </div>
    );
  }
}

export default CMCTreemap;
