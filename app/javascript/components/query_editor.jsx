import React from 'react'
import 'brace'
import 'brace/theme/twilight'
import 'brace/mode/sql'
import 'brace/snippets/sql'
import 'brace/snippets/text'
import 'brace/ext/language_tools'
import AceEditor from 'react-ace'
import $ from 'jquery'

import DataRender from './data_render'
import ChartKindSelect from './chart_kind_select'

export default class QueryEditor extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      sample: this.props.sample || '',
      statement: this.props.statement || '',
      pendingPreview: true,
      columns: [],
      data: [],
      chartKind: this.props.chart_kind,
      pendingSave: false
    }

    this.handleChangeStatement = this.handleChangeStatement.bind(this)
    this.handleChangeSample = this.handleChangeSample.bind(this)
    this.handleChangeChartKind = this.handleChangeChartKind.bind(this)
  }

  componentDidMount() {
    setInterval(this.fetchPreview.bind(this), 1000)
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

  fetchPreview() {
    if (this.state.pendingPreview) {
      this.state.pendingPreview = false

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
  }

  handleChangeChartKind(e) {
    this.setState({ chartKind: e.target.value, pendingSave: true })
  }

  handleChangeSample(e) {
    this.setState({ sample: e.target.value, pendingPreview: true, pendingSave: true })
  }

  handleChangeStatement(statement) {
    this.setState({ statement, pendingPreview: true, pendingSave: true })
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

      <ChartKindSelect chartKind={this.state.chartKind} onChange={this.handleChangeChartKind} />
      <DataRender
        columns={this.state.columns}
        data={this.state.data}
        kind={this.state.chartKind}
        height="400px"
      />
    </div>)
  }
}

QueryEditor.propTypes = {
  sample: React.PropTypes.string,
  chart_kind: React.PropTypes.string,
  statement: React.PropTypes.string
}

QueryEditor.defaultProps = {
  sample: '',
  chart_kind: 'table',
  statement: ''
}
