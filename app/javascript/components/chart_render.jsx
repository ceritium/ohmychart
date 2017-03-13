import React from 'react'
import Chart from 'chart.js'

import {ColumnChart} from 'react-chartkick'

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
    return <div>
      <ColumnChart data={this.chartData()} id='chart' height={this.props.height || '100%'} download={true}/>
      </div>;

  }

}
