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
    this.dataCoins();

    // var url = new URL("https://cmc-node-app.herokuapp.com/charts/getchartdata");
    // // var url = new URL("http://localhost:4000/charts/getchartdata");
    // axios({
    //   method: "GET",
    //   url: url,
    //   data: {
    //     params: {
    //       type: "TreeMap",
    //       category: "TopCoinsBlockchain"
    //     }
    //   },
    //   headers: {
    //     "content-type": "application/json"
    //   }
    // })
    //   .then(function(response) {
    //     console.log("Sucess data");
    //     console.log(response);
    //   })
    //   .catch(function(error) {
    //     console.log(error);
    //   });

    // fetch("https://cmc-node-app.herokuapp.com/charts/getchartdata", {
    //   method: "GET",
    //   headers: {
    //     "Content-Type": "application/json"
    //   },
    //   data: {
    //     params: {
    //       type: "TreeMap",
    //       category: "TopCoinsBlockchain"
    //     }
    //   }
    // }).then(json => {
    //   console.log(json);
    //   // this.setState({
    //   //   treeData: formatData(json)
    //   // });
    // });

    // axios
    //   .get(url, {
    //     params: {
    //       type: "TreeMap",
    //       category: "TopCoinsBlockchain"
    //     }
    //   })
    //   .then(data => {
    //     console.log("sucesssss");
    //     console.log(data);
    //   });
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
