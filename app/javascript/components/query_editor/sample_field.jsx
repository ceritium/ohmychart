import React from 'react'
import PropTypes from 'prop-types'

const QueryEditorSampleField = function SampleField(props) {
  return (<div>
    <strong>
      Sample
    </strong>

    <input
      name="query[sample]"
      type="text"
      className="form-control"
      autoComplete="off"
      value={props.sample}
      onChange={props.handleChange}
    />
  </div>)
}

QueryEditorSampleField.propTypes = {
  sample: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
}

QueryEditorSampleField.defaultProps = {
  sample: '',
}

export default QueryEditorSampleField
