import React from 'react'

import TableRender from 'components/table_render'
import ChartRender from 'components/chart_render'

export default class DataRender extends React.Component {

  render(){
    const component = () => { if (this.props.kind == 'table'){
        return TableRender
      } else {
        return ChartRender
      }
    }

    return React.createElement(component(), this.props)
  }
}
