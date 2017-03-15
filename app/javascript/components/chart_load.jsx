import React from 'react'
import $ from 'jquery'
import ChartRender from 'components/chart_render'

export default class ChartLoad extends React.Component {

  constructor(props){
    super(props)
    this.state = {
    }
  }

  componentDidMount(){
    $.ajax({
      url: this.props.source,
      success: this.onGetData.bind(this)
    })
  }

  onGetData(response){
    this.setState({columns: response.columns, data: response.data})
  }

  render(){
    return <div>
    { this.state.data &&
      <ChartRender columns={this.state.columns} data={this.state.data} kind={this.props.kind}/>
    }
    </div>
  }
}
