import React from 'react'
import PropTypes from 'prop-types'

import TableRender from './table_render'
import ChartRender from './chart_render'

export default class DataRender extends React.Component {

  component() {
    if (this.props.kind === 'table') {
      return TableRender
    }
    return ChartRender
  }

  render() {
    return React.createElement(this.component(), this.props)
  }
}


DataRender.propTypes = {
  kind: PropTypes.string.isRequired,
}
