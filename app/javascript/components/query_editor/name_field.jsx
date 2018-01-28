import React from 'react'
import PropTypes from 'prop-types'

class QueryEditorNameField extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      name: this.props.name
    }
  }

  render() {
    return (<div>
      <div className="form-group string required query_name">
        <label className="control-label string required" htmlFor="query_name">
          <abbr title="required">*</abbr>
          Name
        </label>
        <input
          name="query[name]"
          type="text"
          className="form-control string required"
          defaultValue={this.state.name}
        />
      </div>
    </div>)
  }
}

QueryEditorNameField.propTypes = {
  name: PropTypes.string.isRequired,
}

QueryEditorNameField.defaultProps = {
  name: '',
}

export default QueryEditorNameField
