import React from 'react'
import PropTypes from 'prop-types'
import ChartOptions from './chart_options'

export default class QueryShow extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      chartKind: this.props.chartKind,
      chartStacked: this.props.chartStacked,
      sample: this.props.sample
    }

    this.handleSampleChange = this.handleSampleChange.bind(this)
    this.handleChangeChartKind = this.handleChangeChartKind.bind(this)
    this.handleChangeChartStacked = this.handleChangeChartStacked.bind(this)
  }

  handleSampleChange(e) {
    this.setState({ sample: e.target.value })
  }

  handleChangeChartKind(e) {
    this.setState({ chartKind: e.target.value })
  }

  handleChangeChartStacked(e) {
    this.setState({ chartStacked: e.target.checked })
  }

  render() {
    const iframeWidth = '100%'
    const iframeHeight = '200px'
    const jsonURL = `${this.props.apiQueryUrl}?${this.state.sample}`
    const chartURL = `${this.props.chartsUrl}?source=${encodeURIComponent(jsonURL)}&kind=${this.state.chartKind}&stacked=${this.state.chartStacked}`
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

        <ChartOptions
          chartStacked={this.state.chartStacked}
          chartKind={this.state.chartKind}
          onChangeChartKind={this.handleChangeChartKind}
          onChangeChartStacked={this.handleChangeChartStacked}
        />

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
  apiQueryUrl: PropTypes.string.isRequired,
  chartsUrl: PropTypes.string.isRequired,
  name: PropTypes.string,
  sample: PropTypes.string,
  statement: PropTypes.string,
  chartKind: PropTypes.string,
  chartStacked: PropTypes.bool
}

QueryShow.defaultProps = {
  name: '',
  sample: '',
  statement: '',
  chartKind: 'table',
  chartStacked: false
}
