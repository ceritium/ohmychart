import React from 'react'

export default class TableRender extends React.Component {

  renderRow(row) {
    return this.props.columns.map((column) =>
      <td>{ row[column] }</td>
    )
  }

  render(){
    const headList = this.props.columns.map((column) =>
      <th>{column}</th>
    )

    const rowList = this.props.data.map((row) =>
        <tr>{ this.renderRow(row) }</tr>
    )

    return (
        <table className='table'>
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
