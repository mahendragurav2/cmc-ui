import React, { Component } from "react";
import Highcharts from "highcharts";
import addHeatmapModule from "highcharts/modules/heatmap";
import addTreemapModule from "highcharts/modules/treemap";
import axios from "axios";
import {
  HighchartsChart,
  withHighcharts,
  Title,
  Subtitle,
  XAxis,
  YAxis,
  TreemapSeries,
  Tooltip
} from "react-jsx-highcharts";

addHeatmapModule(Highcharts);
addTreemapModule(Highcharts);

class Coins extends Component {
  constructor(props) {
    super(props);
    this.state = {
      treeData: null
    };
  }

  componentDidMount() {
    var url = new URL("https://cmc-node-app.herokuapp.com/charts/getchartdata");
    axios
      .post(url, {
        params: {
          type: "TreeMap",
          category: "TopCoinsBlockchain"
        },
        headers: {
          "Content-Type": "application/json"
        }
      })
      .then(res => {
        this.setState({ treeData: res.data });
      });
  }
  onClick = e => {
    // alert(
    //   "Id :" +
    //     e.point.node.id +
    //     "  Value : " +
    //     e.point.node.val +
    //     " Lavel " +
    //     e.point.node.level
    // );
  };

  render() {
    const treeData = this.state.treeData;
    if (!treeData) return null;
    const drilldown = [
      {
        drillUpButton: {
          relativeTo: "plotBox",
          position: {
            y: 0,
            x: 0
          },
          theme: {
            // fill: "white",
            //"stroke-width": 1,
            //stroke: "silver",
            r: 0,
            states: {
              hover: {
                fill: "#a4edba"
              },
              select: {
                stroke: "#039",
                fill: "#a4edba"
              }
            }
          }
        }
      }
    ];

    const levels = [
      {
        level: 1,
        dataLabels: {
          enabled: true,
          style: {
            fontSize: "12px",
            color: "#000000",
            fontWeight: "normal",
            textOutline: false
          }
        }
        //borderWidth: 0.5
      },
      {
        level: 2,
        borderWidth: 3,
        dataLabels: {
          enabled: false,
          style: {
            fontSize: "12px",
            color: "#000000",
            background: "#000000",
            fontWeight: "normal"
          },
          allowOverlap: true
        }
        // borderColor: "red",
        //borderWidth: 0.5
      }
    ];
    const tooltipFormatter = function() {
      const formattedValue = formatNumber(this.point.value);
      console.log(this.point);
      const coinDetails = `${this.key}: $${formattedValue}`;
      const price_coin = this.point.price_usd;
      const percentageChanged = Number(this.point.percent_change).toFixed(2);
      return (
        '<span style="font-size:15px;color:blue;font-weight:bold">' +
        coinDetails +
        "<br>" +
        '<span style="font-size:15px;color:blue;font-weight:bold">' +
        "(" +
        percentageChanged +
        "%)" +
        "<br>" +
        '<span style="font-size:15px;color:blue;font-weight:bold">' +
        "Price: " +
        price_coin +
        "</span>" +
        "</span><br>"
      );
    };

    function formatNumber(x) {
      if (x > 1000000) {
        return Math.abs(x / 1000000).toFixed(2) + "M";
      }
      if (x > 1000000000) {
        return Math.abs(x / 1000000000).toFixed(2) + "B";
      }
      return "1T+";
    }
    return (
      <div className="app">
        <HighchartsChart>
          <Title>Top 50 Coins</Title>
          <XAxis />
          <YAxis>
            <TreemapSeries
              data={treeData}
              styledMode={true}
              onClick={this.onClick}
              allowDrillToNode
              borderColor="#777c7a"
              layoutAlgorithm="squarified"
              animationLimit={1000}
              dataLabels={{ enabled: false }}
              levelIsConstant={false}
              levels={levels}
              opacity="0.93"
              drilldown={drilldown}
            />
          </YAxis>
          <Tooltip formatter={tooltipFormatter} />
        </HighchartsChart>
      </div>
    );
  }
}
export default withHighcharts(Coins, Highcharts);
