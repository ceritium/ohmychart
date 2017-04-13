import React from 'react'
import PropTypes from 'prop-types'
import ChartKindSelect from './chart_kind_select'

export default class QueryShow extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      chartKind: this.props.chart_kind,
      sample: this.props.sample
    }

    this.handleSampleChange = this.handleSampleChange.bind(this)
    this.handleChangeChartKind = this.handleChangeChartKind.bind(this)
  }

  handleSampleChange(e) {
    this.setState({ sample: e.target.value })
  }

  handleChangeChartKind(e) {
    this.setState({ chartKind: e.target.value })
  }

  render() {
    const iframeWidth = '100%'
    const iframeHeight = '200px'
    const jsonURL = `${this.props.api_query_url}?${this.state.sample}`
    const chartURL = `${this.props.charts_url}?source=${encodeURIComponent(jsonURL)}&kind=${this.state.chartKind}`
    const iframeCode = `<iframe src='${chartURL}' width='${iframeWidth}' height='${iframeHeight}' border='none'></iframe>`
    return (
      <div>
        <h1> Query: { this.props.name } </h1>
        <pre>
          <code>
            { this.props.statement }
          </code>
        </pre>

        <label htmlFor="sample-data">
          Sample data
        </label>
        <input
          id="sample-data" className="form-control" type="text"
          defaultValue={this.props.sample}
          onChange={this.handleSampleChange}
        />
        <br />
        <strong>
          JSON URL
        </strong>
        <pre>
          <a href={jsonURL}>
            { jsonURL }
          </a>
        </pre>
        <br />
        <ChartKindSelect chartKind={this.state.chartKind} onChange={this.handleChangeChartKind} />
        <br />
        <strong>
          Chart URL
        </strong>
        <pre>
          <a href={chartURL}>
            { chartURL }
          </a>
        </pre>
        <br />
        <strong>
          Iframe code
        </strong>
        <input className="form-control" readOnly type="text" value={iframeCode} />
        <br />
        <strong>
          Iframe preview
        </strong>
        <iframe src={chartURL} width={iframeWidth} height={iframeHeight} />
      </div>)
  }
}

QueryShow.propTypes = {
  api_query_url: PropTypes.string.isRequired,
  charts_url: PropTypes.string.isRequired,
  name: PropTypes.string,
  sample: PropTypes.string,
  statement: PropTypes.string,
  chart_kind: PropTypes.string
}

QueryShow.defaultProps = {
  name: '',
  sample: '',
  statement: '',
  chart_kind: 'table'
}
