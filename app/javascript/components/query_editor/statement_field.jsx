import React from 'react'
import PropTypes from 'prop-types'

import 'brace'
import 'brace/theme/twilight'
import 'brace/mode/sql'
import 'brace/snippets/sql'
import 'brace/snippets/text'
import 'brace/ext/language_tools'
import AceEditor from 'react-ace'

const QueryEditorStatementField = function StatementField(props) {
  return (<div>
    <input
      name="query[statement]"
      type="hidden"
      value={props.statement}
    />
    <div>
      <AceEditor
        name="editor"
        mode="sql"
        theme="twilight"
        onChange={props.handleChange}
        value={props.statement}
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

  </div>)
}

QueryEditorStatementField.propTypes = {
  statement: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
}

QueryEditorStatementField.defaultProps = {
  statement: '',
}

export default QueryEditorStatementField
