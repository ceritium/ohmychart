import React from 'react'
import PropTypes from 'prop-types'

import styles from './table_render.scss'

export default class TableRender extends React.Component {

  renderRow(row) {
    return this.props.columns.map((column, index) =>
      // eslint-disable-next-line react/no-array-index-key
      <td key={index}>{ row[column] }</td>
    )
  }

  render() {
    const headList = this.props.columns.map((column, index) =>
      // eslint-disable-next-line react/no-array-index-key
      <th key={index}>{column}</th>
    )

    const rowList = this.props.data.map((row, index) =>
      // eslint-disable-next-line react/no-array-index-key
      <tr key={index}>{ this.renderRow(row) }</tr>
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
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  columns: PropTypes.arrayOf(PropTypes.string).isRequired,
}

TableRender.defaultProps = {
  data: [],
  columns: []
}
