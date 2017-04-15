import React from 'react'
import PropTypes from 'prop-types'

export default function ChartKindSelect(props) {
  return (<div>
    <div className="row">
      <div className="col-md-3">
        <label htmlFor="query_chart_kind">
          Chart kind
        </label>
      </div>
      <div className="col-md-9">
        <select
          id="query_chart_kind"
          name="query[chart_kind]"
          className="form-control"
          value={props.chartKind}
          onChange={props.onChange}
        >
          <option value="table"> Table </option>
          <option value="column"> Column </option>
          <option value="bar"> Bar </option>
          <option value="line"> Line </option>
          <option value="area"> Area </option>
          <option value="pie"> Pie </option>
          <option value="scatter"> Scatter </option>
        </select>
      </div>
    </div>
  </div>)
}

ChartKindSelect.propTypes = {
  chartKind: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
}
