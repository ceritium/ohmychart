import React from 'react'
import PropTypes from 'prop-types'

import $ from 'jquery'

import NameField from './query_editor/name_field'
import StatementField from './query_editor/statement_field'
import SampleField from './query_editor/sample_field'
import Metadata from './query_editor/metadata'
import DataRender from './data_render'
import ChartOptions from './chart_options'

class QueryEditor extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      name: this.props.name,
      sample: this.props.sample,
      statement: this.props.statement,
      columns: [],
      data: [],
      chartKind: this.props.chartKind,
      chartStacked: this.props.chartStacked,
      pendingSave: false
    }

    this.handleRun = this.handleRun.bind(this)
    this.handleChangeStatement = this.handleChangeStatement.bind(this)
    this.handleChangeSample = this.handleChangeSample.bind(this)
    this.handleChangeChartKind = this.handleChangeChartKind.bind(this)
    this.handleChangeChartStacked = this.handleChangeChartStacked.bind(this)
  }

  componentDidMount() {
    this.fetchPreview()
    // window.onbeforeunload = this.askClose.bind(this)
  }

  onFetchSuccess(response) {
    this.setState({
      data: response.data,
      columns: response.columns,
      sql: response.sql,
      explain: response.explain,
      error: response.error
    })
  }

  handleRun(e) {
    e.preventDefault()
    this.fetchPreview()
  }

  fetchPreview() {
    const sample = {}
    this.state.sample.split('&').forEach((pair) => {
      const keyValue = pair.split('=')
      sample[keyValue[0]] = keyValue[1]
    })

    $.ajax({
      url: '/queries/preview',
      method: 'POST',
      data: {
        statement: this.state.statement,
        sample
      },
      success: this.onFetchSuccess.bind(this)
    })
  }

  handleChangeChartKind(e) {
    this.setState({ chartKind: e.target.value, pendingSave: true })
  }

  handleChangeChartStacked(e) {
    this.setState({ chartStacked: e.target.checked })
  }

  handleChangeSample(e) {
    this.setState({ sample: e.target.value, pendingSave: true })
  }

  handleChangeStatement(statement) {
    this.setState({ statement, pendingSave: true })
  }

  askClose() {
    if (this.state.pendingSave) {
      return 'You have attempted to leave this page. Are you sure?'
    }
    return false
  }

  render() {
    return (<div>
      <div className="col-md-9">
        <NameField name={this.state.name} />
        <StatementField
          statement={this.state.statement}
          handleChange={this.handleChangeStatement}
        />
        <div className="row">
          <div className="col-md-11">
            <SampleField
              sample={this.state.sample}
              handleChange={this.handleChangeSample}
            />
          </div>
          <div className="col-md-1">
            <br />
            <button onClick={this.handleRun} className="btn btn-default"> RUN </button>
          </div>
        </div>
        <Metadata
          explain={this.state.explain}
          error={this.state.error}
          sql={this.state.sql}
        />
        <ChartOptions
          chartStacked={this.state.chartStacked}
          chartKind={this.state.chartKind}
          onChangeChartKind={this.handleChangeChartKind}
          onChangeChartStacked={this.handleChangeChartStacked}
        />
        <br />

        <DataRender
          columns={this.state.columns}
          data={this.state.data}
          kind={this.state.chartKind}
          stacked={this.state.chartStacked}
          height="400px"
        />
      </div>
    </div>)
  }
}

QueryEditor.propTypes = {
  name: PropTypes.string.isRequired,
  sample: PropTypes.string,
  chartKind: PropTypes.string,
  chartStacked: PropTypes.bool,
  statement: PropTypes.string
}

QueryEditor.defaultProps = {
  name: '',
  sample: '',
  chartKind: 'table',
  chartStacked: false,
  statement: ''
}

export default QueryEditor
