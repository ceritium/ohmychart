import React from 'react'
import Chart from 'chart.js'

import {ColumnChart, LineChart, AreaChart, PieChart, BarChart, ScatterChart} from 'react-chartkick'

export default class ChartRender extends React.Component {
  chartData(){
    const responseColumns = this.props.columns;
    const responseData = this.props.data;

    if(this.props.kind == 'pie'){
      if (responseData){
        return responseData.map(data => {
          return [data[responseColumns[0]], data[responseColumns[1]]]
        });
      } else {
        return [];
      }
    }

    if (responseColumns && responseData){
      return responseColumns.slice(1).map(x => {
        return {name: x, data: responseData.map(data => {
          return [data[responseColumns[0]], data[x]];
        })}
      })
    } else {
      return [];
    }
  }

  capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  }

  render(){
    const chartKinds = {
      column: ColumnChart,
      line: LineChart,
      area: AreaChart,
      bar: BarChart,
      scatter: ScatterChart,
      pie: PieChart
    }

    const kind = (this.props.kind || 'column').toLowerCase()

    return React.createElement(chartKinds[kind]||ColumnChart, {data: this.chartData(), height: (this.props.height || '100%'), download: true})
  }

}
