import React from 'react';

export default class ChartKindSelect extends React.Component {

  render(){
    return <div>
      <label>
        Chart kind
      </label>
      <select name='query[chart_kind]' className='form-control' value={this.props.chartKind} onChange={this.props.onChange}>
        <option value='line'> Line </option>
        <option value='column'> Column </option>
        <option value='area'> Area </option>
      </select>
      </div>;
  }
}
