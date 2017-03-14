import React from 'react'
import Chart from 'chart.js'

import {ColumnChart, LineChart, AreaChart} from 'react-chartkick'

export default class ChartRender extends React.Component {

  chartData(){
    const responseColumns = this.props.columns;
    const responseData = this.props.data;
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

  render(){
    let chartKind;
    switch(this.props.kind){
      case 'Area':
        chartKind = <AreaChart data={this.chartData()} id='chart' height={this.props.height || '100%'} download={true}/>
        break;
      case 'Column':
        chartKind = <ColumnChart data={this.chartData()} id='chart' height={this.props.height || '100%'} download={true}/>
        break;
      default:
        chartKind = <LineChart data={this.chartData()} id='chart' height={this.props.height || '100%'} download={true}/>
    }

    return <div>
      {chartKind}
      </div>;

  }

}
