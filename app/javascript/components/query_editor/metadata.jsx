import React from 'react'
import PropTypes from 'prop-types'

const QueryEditorMetadata = function Metadata(props) {
  return (<div>
    <br />
    <div className="alert alert-info">
      { props.sql }
    </div>

    { props.error && (
      <div className="alert alert-warning">
        { props.error }
      </div>)
    }

    { props.explain && (
      <pre className="text-success">
        { props.explain }
      </pre>)
    }
    <br />
  </div>)
}

QueryEditorMetadata.propTypes = {
  explain: PropTypes.string,
  error: PropTypes.string,
  sql: PropTypes.string,
}

QueryEditorMetadata.defaultProps = {
  explain: null,
  error: null,
  sql: null
}

export default QueryEditorMetadata
