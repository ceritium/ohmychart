import React from 'react';

export default class ChartKindSelect extends React.Component {

  render(){
    return <div>
      <label>
        Chart kind
      </label>
      <select name='query[chart_kind]' className='form-control' value={this.props.chartKind} onChange={this.props.onChange}>
        <option value='table'> Table </option>
        <option value='column'> Column </option>
        <option value='bar'> Bar </option>
        <option value='line'> Line </option>
        <option value='area'> Area </option>
        <option value='pie'> Pie </option>
        <option value='scatter'> Scatter </option>
      </select>
      </div>;
  }
}
