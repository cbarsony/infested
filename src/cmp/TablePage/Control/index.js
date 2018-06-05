import React, {Component} from 'react'
import makeBem from 'bem-cx'

import {translate, keys} from 'utils/translate'
import {Field} from 'cmp/App/Form/Field'

import {SprayingTable} from './SprayingTable'

const cn = makeBem('Control')

export class Control extends Component {
  state = {
    weed: false,
    chemical1: false,
    chemical2: false,
    chemical3: false,
    chemical4: false,
  }

  onCheckChange = (value, name) => this.setState({[name]: value})

  render() {
    const state = this.state

    return (
      <div className={cn}>
        <Field
          name="weed"
          label={translate(keys.WEED_INFESTATION)}
          type="checkbox"
          value={state.weed}
          onChange={this.onCheckChange}
        />
        <Field
          name="chemical1"
          label={translate(keys.CHEMICAL) + '1'}
          type="checkbox"
          value={state.chemical1}
          onChange={this.onCheckChange}
        />
        <Field
          name="chemical2"
          label={translate(keys.CHEMICAL) + '2'}
          type="checkbox"
          value={state.chemical2}
          onChange={this.onCheckChange}
        />
        <Field
          name="chemical3"
          label={translate(keys.CHEMICAL) + '3'}
          type="checkbox"
          value={state.chemical3}
          onChange={this.onCheckChange}
        />
        <Field
          name="chemical4"
          label={translate(keys.CHEMICAL) + '4'}
          type="checkbox"
          value={state.chemical4}
          onChange={this.onCheckChange}
        />
        <SprayingTable
          areWeedSectorsVisible={state.weed}
          chemicalSectorVisibility={[
            state.chemical1,
            state.chemical2,
            state.chemical3,
            state.chemical4,
          ]}
        />
      </div>
    )
  }
}
