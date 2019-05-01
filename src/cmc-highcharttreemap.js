import React, { Component } from "react";
import Highcharts from "highcharts";
import addHeatmapModule from "highcharts/modules/heatmap";
import addTreemapModule from "highcharts/modules/treemap";
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

// Apply Highcharts modules
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

class CmcHighTreemap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      treemapData: [
        {
          name: "AXD",
          id: "AXD",
          value: 1,
          color: "#33FFFF"
        },

        {
          name: "BTC",
          id: "BTC",
          value: 1,
          color: "#FF334C"
        },

        {
          name: "XYT",
          id: "XYT",
          value: 2,
          color: "#3633FF"
        },
        {
          name: "ETH",
          id: "ETH",
          value: 1,
          color: "#FF334C"
        },
        {
          name: "OTHERS",
          value: 1,
          id: "OTHERS",
          color: "#B33ABF"
        },
        {
          name: "OTHERS-1",
          value: 1,
          id: "OTHERS1",
          parent: "OTHERS",
          color: "#FF334C"
        },
        {
          name: "OTHERS-2",
          value: 1,
          id: "OTHERS2",
          parent: "OTHERS",
          color: "#CFD801"
        },
        {
          name: "OTHERS-3",
          value: 1,
          id: "OTHERS2",
          parent: "OTHERS",
          color: "#C6AA0D"
        },
        {
          name: "OTHERS-4",
          value: 1,
          id: "OTHERS2",
          parent: "OTHERS",
          color: "#0DC667"
        },
        {
          name: "OTHERS-5",
          value: 1,
          id: "OTHERS2",
          parent: "OTHERS",
          color: "#B2C60D"
        },
        {
          name: "OTHERS-6",
          value: 1,
          id: "OTHERS2",
          parent: "OTHERS",
          color: "#0DC6C6"
        }
      ]
    };
  }

  componentDidMount() {
    // fetch(
    //   "https://gist.githubusercontent.com/whawker/809cae1781f25db5f3c2dd7cee93b017/raw/94ca755307ac5651686467b5fa1844659b5817a3/data.json"
    // )
    //   .then(res => {
    //     if (res.ok) {
    //       return res.json();
    //     }
    //     throw new Error("Network response was not ok.");
    //   })
    //   .then(json => {
    //     this.setState({
    //       treeData: formatData(json)
    //     });
    //   });
  }

  render() {
    const treeData = this.state.treemapData;
    if (!treeData) return null;

    const levels = [
      {
        level: 1,
        dataLabels: {
          enabled: true
        },
        borderWidth: 3
      }
    ];
    const tooltipFormatter = function() {
      return `${this.key}: ${this.point.value}`;
    };

    return (
      <div className="app">
        <HighchartsChart>
          <Title>Top Coins- Blockchain</Title>
          <Subtitle>This is sample data for coinviz</Subtitle>

          <XAxis />

          <YAxis>
            <TreemapSeries
              data={treeData}
              allowDrillToNode
              // layoutAlgorithm="squarified"
              animationLimit={1000}
              dataLabels={{ enabled: false }}
              levelIsConstant={true}
              levels={levels}
            />
          </YAxis>

          <Tooltip formatter={tooltipFormatter} />
        </HighchartsChart>
      </div>
    );
  }
}

export default withHighcharts(CmcHighTreemap, Highcharts);
