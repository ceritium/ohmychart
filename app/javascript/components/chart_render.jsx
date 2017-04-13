import React from 'react'
import PropTypes from 'prop-types'
import 'chart.js'
import { ColumnChart, LineChart, AreaChart, PieChart, BarChart, ScatterChart } from 'react-chartkick'

export default class ChartRender extends React.Component {
  chartData() {
    const responseColumns = this.props.columns
    const responseData = this.props.data

    if (this.props.kind === 'pie') {
      if (responseData) {
        return responseData.map(data => (
          [data[responseColumns[0]], data[responseColumns[1]]]
        ))
      }
      return []
    }

    if (responseColumns && responseData) {
      return responseColumns.slice(1).map(x => (
        {
          name: x,
          data: responseData.map(data => (
            [data[responseColumns[0]], data[x]]
          ))
        }
      ))
    }
    return []
  }

  render() {
    const chartKinds = {
      column: ColumnChart,
      line: LineChart,
      area: AreaChart,
      bar: BarChart,
      scatter: ScatterChart,
      pie: PieChart
    }

    const kind = this.props.kind.toLowerCase()
    return React.createElement(chartKinds[kind] || ColumnChart, {
      data: this.chartData(), height: this.props.height
    })
  }
}

ChartRender.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  columns: PropTypes.arrayOf(PropTypes.string).isRequired,
  kind: PropTypes.string,
  height: PropTypes.string
}

ChartRender.defaultProps = {
  height: '100%',
  kind: 'column',
}
