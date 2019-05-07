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

const formatData = data => {
  const colours = Highcharts.getOptions().colors;
  const formattedData = [];
  Object.keys(data).forEach((regionName, rIndex) => {
    const region = {
      id: `id_${rIndex}`,
      name: regionName,
      color: colours[rIndex]
    };
    let regionSum = 0;

    const countries = Object.keys(data[regionName]);
    countries.forEach((countryName, cIndex) => {
      const country = {
        id: `${region.id}_${cIndex}`,
        name: countryName,
        parent: region.id
      };
      formattedData.push(country);

      Object.keys(data[regionName][countryName]).forEach((causeName, index) => {
        const cause = {
          id: `${country.id}_${index}`,
          name: causeName,
          parent: country.id,
          value: Math.round(
            parseFloat(data[regionName][countryName][causeName])
          )
        };
        formattedData.push(cause);
        regionSum += cause.value;
      });
    });

    region.value = Math.round(regionSum / countries.length);
    formattedData.push(region);
  });

  return formattedData;
};

class Coins extends Component {
  constructor(props) {
    super(props);
    this.state = {
      treeData: null
      // treemapData: [
      //   {
      //     name: "AXD",
      //     id: "AXD",
      //     value: 3,
      //     color: "#33FFFF"
      //   },

      //   {
      //     name: "BTC",
      //     id: "BTC",
      //     value: 1,
      //     color: "#FF334C"
      //   },

      //   {
      //     name: "XYT",
      //     id: "XYT",
      //     value: 2,
      //     color: "#3633FF"
      //   },
      //   {
      //     name: "ETH",
      //     id: "ETH",
      //     value: 1,
      //     color: "#FF334C"
      //   },
      //   {
      //     name: "OTHERS",
      //     value: 1,
      //     id: "OTHERS",
      //     color: "#A9A4A9"
      //   },
      //   {
      //     name: "OTHERS-1",
      //     value: 1,
      //     id: "OTHERS1",
      //     parent: "OTHERS",
      //     color: "#FF334C"
      //   },
      //   {
      //     name: "OTHERS-2",
      //     value: 1,
      //     id: "OTHERS2",
      //     parent: "OTHERS",
      //     color: "#CFD801"
      //   },
      //   {
      //     name: "OTHERS-3",
      //     value: 1,
      //     id: "OTHERS2",
      //     parent: "OTHERS",
      //     color: "#C6AA0D"
      //   },
      //   {
      //     name: "OTHERS-4",
      //     value: 3,
      //     id: "OTHERS2",
      //     parent: "OTHERS",
      //     color: "#0DC667"
      //   },
      //   {
      //     name: "OTHERS-5",
      //     value: 10,
      //     id: "OTHERS2",
      //     parent: "OTHERS",
      //     color: "#B2C60D"
      //   },
      //   {
      //     name: "OTHERS-6",
      //     value: 2,
      //     id: "OTHERS2",
      //     parent: "OTHERS",
      //     color: "#0DC6C6"
      //   }
      // ]
    };
  }

  componentDidMount() {
    var url = new URL("https://cmc-node-app.herokuapp.com/charts/getchartdata");
    // var url = new URL(
    //   "https://gist.githubusercontent.com/whawker/809cae1781f25db5f3c2dd7cee93b017/raw/94ca755307ac5651686467b5fa1844659b5817a3/data.json"
    // );

    axios
      .get(url, {
        data: {
          params: {
            type: "TreeMap",
            category: "TopCoinsBlockchain"
          }
        },
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*"
        }
      })
      .then(res => {
        console.log("sucesssss");
        console.log(res.data);
      });

    //Working
    // fetch(
    //   "https://gist.githubusercontent.com/whawker/809cae1781f25db5f3c2dd7cee93b017/raw/94ca755307ac5651686467b5fa1844659b5817a3/data.json"
    // )
    //   .then(res => {
    //     if (res.ok) {
    //       console.log("sucess!!");
    //       return res.json();
    //     }
    //     console.log("fail!!");
    //     //throw new Error("Network response was not ok.");
    //   })
    //   .then(json => {
    //     this.setState({
    //       treeData: formatData(json)
    //     });
    //   });
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
          relativeTo: "spacingBox",
          position: {
            y: 0,
            x: 0
          },
          theme: {
            fill: "white",
            "stroke-width": 1,
            stroke: "silver",
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
          enabled: true
        },
        borderWidth: 3
      },
      {
        level: 2,
        borderWidth: 3,
        dataLabels: {
          enabled: false,
          style: {
            fontSize: "45px",
            color: "#FFFFFF",
            fontWeight: "bold"
          },
          allowOverlap: true
        },
        borderColor: "red",
        borderWidth: 1
      }
    ];
    const tooltipFormatter = function() {
      // return `${this.key}: ${this.point.value}`;
      const val = `${this.key}: ${this.point.value}`;
      return (
        '<span style="font-size:15px;color:blue;font-weight:bold">' +
        val +
        "</span><br>"
      );
    };

    return (
      <div className="app">
        <HighchartsChart>
          <Subtitle>Top 50 Coins</Subtitle>

          <XAxis />

          <YAxis>
            <TreemapSeries
              data={treeData}
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
