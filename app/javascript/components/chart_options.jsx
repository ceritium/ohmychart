import React from 'react'
import PropTypes from 'prop-types'

import ChartKindSelect from './chart_kind_select'

export default function ChartOptions(props) {
  return (<div>
    <div className="row">
      <div className="col-md-6">
        <ChartKindSelect chartKind={props.chartKind} onChange={props.onChangeChartKind} />
      </div>
      <div className="col-md-1">
        <label htmlFor="query_chart_stacked">
          Stacked
        </label>
      </div>
      <div className="col-md-1">
        <input
          name="query[chart_stacked]"
          type="checkbox"
          value="true"
          checked={props.chartStacked}
          onChange={props.onChangeChartStacked}
        />
      </div>
    </div>
  </div>)
}

ChartOptions.propTypes = {
  chartKind: PropTypes.string.isRequired,
  onChangeChartKind: PropTypes.func.isRequired,
  chartStacked: PropTypes.bool.isRequired,
  onChangeChartStacked: PropTypes.func.isRequired
}
