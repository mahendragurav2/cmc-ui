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
    };
  }

  componentDidMount() {
    //this.dataCoins();
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
        // res.data.slice(0);
        // res.data.splice(0, 1);

        // const obj = {
        //   // color: "#bcb2b1",
        //   id: "Other Coins",
        //   name: "Others",
        //   parent: null,
        //   // percent_change: 2.34074,
        //   // price_usd: "$6,000.60",
        //   value: 10615888899.29 //This will be sun of childs
        // };
        // res.data.push(obj);

        // Object.keys(res.data).map((d, key) => {
        //   if (res.data[key].parent == "Top Coins - Blockchain")
        //     res.data[key].parent = null;
        // });
        // console.log(res.data);
        this.setState({ treeData: res.data });
      });
  }

  dataCoins = async () => {
    const coins = this.getCoins()
      .then(response => {
        if (response.data) {
          console.log(response);
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  getCoins = () => {
    try {
      return axios.get(
        "https://cmc-node-app.herokuapp.com/charts/getchartdata",
        {
          data: {
            params: {
              type: "TreeMap",
              category: "TopCoinsBlockchain"
            }
          }
        }
      );
    } catch (error) {
      console.error(error);
    }
  };

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
    //const treemapData = this.state.treemapData;
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
          // style: {
          //   fontSize: "45px",
          //   color: "#FFFFFF",
          //   fontWeight: "bold"
          // },
          allowOverlap: true
        },
        borderColor: "red",
        borderWidth: 1
      }
    ];
    const tooltipFormatter = function() {
      //  const formattedValue = formatNumber(this.point.value);
      //console.log(formattedValue);
      const val = `${this.key}: ${this.point.value}`;

      return (
        '<span style="font-size:15px;color:blue;font-weight:bold">' +
        val +
        "</span><br>"
      );
    };

    function formatNumber(x) {
      if (isNaN(x)) return x;

      if (x < 9999) {
        return x;
      }
      if (x < 1000000) {
        return Math.round(x / 1000) + "K";
      }
      if (x < 10000000) {
        return (x / 1000000).toFixed(2) + "M";
      }

      if (x < 1000000000) {
        return Math.round(x / 1000000) + "M";
      }

      if (x < 1000000000000) {
        return Math.round(x / 1000000000) + "B";
      }

      return "1T+";
    }

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
