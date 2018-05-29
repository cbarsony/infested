import React, {Component} from 'react'

export class TablePage extends Component {
  render() {
    return (
      <div>
        <h1>TablePage</h1>
        <div>{this.props.match.params.id}</div>
      </div>
    )
  }
}
