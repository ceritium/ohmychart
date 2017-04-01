import React from 'react'
import $ from 'jquery'
import DataRender from './data_render'

export default class ChartLoad extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
    }
  }

  componentDidMount() {
    $.ajax({
      url: this.props.source,
      success: this.onGetData.bind(this)
    })
  }

  onGetData(response) {
    this.setState({ columns: response.columns, data: response.data })
  }

  render() {
    return (
      <div>
        { this.state.data &&
          <DataRender columns={this.state.columns} data={this.state.data} kind={this.props.kind} />
        }
      </div>)
  }
}

ChartLoad.propTypes = {
  kind: React.PropTypes.string.isRequired,
  source: React.PropTypes.string.isRequired
}
