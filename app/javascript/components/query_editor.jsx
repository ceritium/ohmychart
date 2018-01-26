import React from 'react'
import PropTypes from 'prop-types'

import 'brace'
import 'brace/theme/twilight'
import 'brace/mode/sql'
import 'brace/snippets/sql'
import 'brace/snippets/text'
import 'brace/ext/language_tools'
import AceEditor from 'react-ace'
import $ from 'jquery'

import DataRender from './data_render'
import ChartOptions from './chart_options'

class QueryEditor extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      sample: this.props.sample,
      statement: this.props.statement,
      columns: [],
      data: [],
      chartKind: this.props.chart_kind,
      chartStacked: this.props.chart_stacked,
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
      <input name="query[statement]" type="hidden" value={this.state.statement} />

      <div>
        <AceEditor
          name="editor"
          mode="sql"
          theme="twilight"
          onChange={this.handleChangeStatement}
          value={this.state.statement}
          editorProps={{ $blockScrolling: Infinity }}
          onLoad={(editor) => {
            editor.getSession().setUseWrapMode(true)
          }}
          width="100%"
          height="200px"
          showGutter={false}
          showPrintMargin={false}
          tabSize={2}
          enableBasicAutocompletion
          enableSnippets
          enableLiveAutocompletion
          highlightActiveLine
          fontSize={12}
          minLines={10}
        />
      </div>

      <div className="row">
        <div className="col-md-11">
          <strong>
            Sample
          </strong>

          <input
            name="query[sample]"
            type="text"
            className="form-control"
            autoComplete="off"
            value={this.state.sample}
            onChange={this.handleChangeSample}
          />
        </div>
        <div className="col-md-1">
          <br />
          <button onClick={this.handleRun} className="btn btn-default"> RUN </button>
        </div>
      </div>
      <br />
      <div className="alert alert-info">
        { this.state.sql }
      </div>

      { this.state.error && (
        <div className="alert alert-warning">
          { this.state.error }
        </div>)
      }

      { this.state.explain && (
        <pre className="text-success">
          { this.state.explain }
        </pre>)
      }
      <br />

      <ChartOptions
        chartStacked={this.state.chartStacked}
        chartKind={this.state.chartKind}
        onChangeChartKind={this.handleChangeChartKind}
        onChangeChartStacked={this.handleChangeChartStacked}
      />

      <DataRender
        columns={this.state.columns}
        data={this.state.data}
        kind={this.state.chartKind}
        stacked={this.state.chartStacked}
        height="400px"
      />
    </div>)
  }
}

QueryEditor.propTypes = {
  sample: PropTypes.string,
  chart_kind: PropTypes.string,
  chart_stacked: PropTypes.bool,
  statement: PropTypes.string
}

QueryEditor.defaultProps = {
  sample: '',
  chart_kind: 'table',
  chart_stacked: false,
  statement: ''
}

export default QueryEditor
