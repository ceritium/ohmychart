import React from 'react'
import ace from 'brace'
import 'brace/theme/twilight'
import 'brace/mode/sql'
import 'brace/snippets/sql'
import 'brace/snippets/text'
import 'brace/ext/language_tools'
import AceEditor from 'react-ace'
import ChartRender from 'components/chart_render'
import ChartKindSelect from 'components/chart_kind_select';

class QueryEditor extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      sample: this.props.sample,
      statement: this.props.statement,
      pendingPreview: true,
      columns: [],
      data: [],
      chartKind: this.props.chart_kind || 'column',
      pendingSave: false
    }

    this.handleChangeStatement = this.handleChangeStatement.bind(this)
    this.handleChangeSample = this.handleChangeSample.bind(this)
    this.handleChangeChartKind = this.handleChangeChartKind.bind(this)
  }

  componentDidMount(){
    setInterval(this.fetchPreview.bind(this), 1000);
    window.onbeforeunload = this.askClose.bind(this);
    }

  askClose(){
    if(this.state.pendingSave){
      return "You have attempted to leave this page. Are you sure?";
    }
  }

  handleChangeStatement(statement){
    this.setState({statement: statement, pendingPreview: true, pendingSave: true})
  }

  handleChangeSample(e){
    this.setState({sample: e.target.value, pendingPreview: true, pendingSave: true})
  }

  handleChangeChartKind(e){
    this.setState({chartKind: e.target.value, pendingSave: true})
  }

  fetchPreview(){
    if (this.state.pendingPreview){
      this.state.pendingPreview = false;

      let options = {}

      let sample = this.state.sample
      sample.split("&").forEach(pair => {
        let keyValue = pair.split('=')
          options[keyValue[0]] = keyValue[1]
      })

      $.ajax({
          url: '/queries/preview',
          method: 'POST',
          data: {
            statement: this.state.statement,
            options: options
          },
          success: this.onFetchSuccess.bind(this)
      })
    }
  }

  onFetchSuccess(response){
    this.setState({data: response.data, columns: response.columns, sql: response.sql, explain: response.explain, error: response.error})
  }

  render(){
    return <div>
      <input name="query[statement]" type="hidden" value={this.state.statement}/>

      <div>
        <AceEditor
          name="editor"
          mode="sql"
          theme="twilight"
          onChange={this.handleChangeStatement}
          value={this.state.statement}
          editorProps={{$blockScrolling: Infinity}}
          onLoad={(editor) => {
            editor.getSession().setUseWrapMode(true);
          }}
          width="100%"
          height="200px"
          showGutter={false}
          showPrintMargin={false}
          tabSize={2}
          enableBasicAutocompletion={true}
          enableSnippets={true}
          enableLiveAutocompletion={true}
          highlightActiveLine={true}
          fontSize={12}
          minLines={10}
          />
        </div>

        <label>
          Sample
        </label>
        <input name="query[sample]" type="text" className="form-control" autoComplete="off"
          value={this.state.sample} onChange={this.handleChangeSample}/>

        <br/>
        <div className='alert alert-info'>
          { this.state.sql }
        </div>

        { this.state.error && (
          <div className='alert alert-warning'>
            { this.state.error }
          </div>)
        }

        { this.state.explain && (
          <pre className='text-success'>
            { this.state.explain }
          </pre>)
        }
        <br/>
        <ChartKindSelect chartKind={this.state.chartKind} onChange={this.handleChangeChartKind}/>
        <ChartRender columns={this.state.columns} data={this.state.data} kind={this.state.chartKind} height='400px'/>
      </div>;
  }
}

export default QueryEditor;
