import React from 'react'
import PropTypes from 'prop-types'

import styles from './table_render.scss'

export default class TableRender extends React.Component {

  renderRow(row) {
    return this.props.columns.map(column =>
      <td>{ row[column] }</td>
    )
  }

  render() {
    const headList = this.props.columns.map(column =>
      <th>{column}</th>
    )

    const rowList = this.props.data.map(row =>
      <tr>{ this.renderRow(row) }</tr>
    )

    return (
      <table className={styles.table}>
        <thead>
          <tr>
            { headList }
          </tr>
        </thead>
        <tbody>
          { rowList }
        </tbody>

      </table>
    )
  }

}

TableRender.propTypes = {
  data: PropTypes.optionalArray,
  columns: PropTypes.optionalArray
}

TableRender.defaultProps = {
  data: [],
  columns: []
}
