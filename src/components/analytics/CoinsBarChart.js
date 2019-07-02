// import React, { Component } from "react";
// import Highcharts from "highcharts";
// import {
//   HighchartsChart,
//   Chart,
//   withHighcharts,
//   XAxis,
//   YAxis,
//   Title,
//   Legend,
//   ColumnSeries,
//   SplineSeries,
//   PieSeries,
//   BarSeries
// } from "react-jsx-highcharts";

// class CoinsBarChart extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       treemapData: [["A", 6]]
//     };
//   }
//   render() {
//     const treemapData = this.state.treemapData;
//     const categoryData = [
//       ["Website visits", 15654],
//       ["Downloads", 4064],
//       ["Requested price list", 1987],
//       ["Invoice sent", 976],
//       ["Finalized", 846]
//     ];
//     return (
//       <div className="app">
//         <HighchartsChart>
//           <Chart />

//           <Title>Top coins by Industry</Title>

//           <Legend />

//           <XAxis />

//           <YAxis>
//             <ColumnSeries color="#FF0000" data={[1, 2, 3]} />
//           </YAxis>
//         </HighchartsChart>
//       </div>
//     );
//   }
// }

// export default withHighcharts(CoinsBarChart, Highcharts);

import React, { Component } from "react";
import * as ReactDom from "react-dom";
import * as Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import {
  HighchartsChart,
  Chart,
  withHighcharts,
  XAxis,
  YAxis,
  Title,
  Legend,
  ColumnSeries,
  SplineSeries,
  PieSeries,
  BarSeries
} from "react-jsx-highcharts";

class CoinsBarChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // To avoid unnecessary update keep all options in the state.
      chartOptions: {
        title: {
          text: "Top coins by Industry"
        },

        xAxis: {
          categories: ["BTC", "EOS", "XLM", "BSV", "DASH", "ETC", "ZEC"]
        },
        series: [
          {
            type: "column",
            name: "",
            colorByPoint: true,
            data: [
              {
                name: "BTC",
                color: "red",
                y: 62.74
              },
              {
                name: "EOS",
                y: 10.57
              },
              {
                name: "XLM",
                y: 7.23
              },
              {
                name: "BSV",
                y: 5.58
              },
              {
                name: "DASH",
                y: 4.02
              },
              {
                name: "ETC",
                y: 1.92
              },
              {
                name: "ZEC",
                y: 7.62
              }
            ]
          }
        ]
      }
    };
  }

  render() {
    const { chartOptions } = this.state;
    return <HighchartsReact highcharts={Highcharts} options={chartOptions} />;
  }
}

export default CoinsBarChart;
