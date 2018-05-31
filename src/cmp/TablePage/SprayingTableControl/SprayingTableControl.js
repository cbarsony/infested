import React, {Component} from 'react'
import PropTypes from 'prop-types'
import makeBem from 'bem-cx'

import {Section} from 'api/classes'
import {translate, keys} from 'utils/translate'
import {Form, Field} from 'cmp/App/Form'

import {SprayingTable} from './SprayingTable'

const cn = makeBem('SprayingTableControl')
const weedCheckboxId = cn.el('weedCheckbox').toString()
const chemicalCheckboxId = cn.el('chemicalCheckbox').toString()

export class SprayingTableControl extends Component {
  state = {
    weed: false,
    chemical1: false,
    chemical2: false,
    chemical3: false,
    chemical4: false,
  }

  onCheckChange = e => this.setState({[e.target.name]: e.target.checked})

  render() {
    const props = this.props
    const state = this.state

    return (
      <div className={cn}>
        <Form>
          <Field
            label={translate(keys.WEED_INFESTATION)}
            htmlFor={weedCheckboxId}
          >
            <input
              type="checkbox"
              id={weedCheckboxId}
              name="weed"
              onChange={this.onCheckChange}
            />
          </Field>
          <Field
            label={translate(keys.CHEMICAL) + '1'}
            htmlFor={chemicalCheckboxId + '1'}
          >
            <input
              type="checkbox"
              id={chemicalCheckboxId + '1'}
              name="chemical1"
              onChange={this.onCheckChange}
            />
          </Field>
          <Field
            label={translate(keys.CHEMICAL) + '2'}
            htmlFor={chemicalCheckboxId + '2'}
          >
            <input
              type="checkbox"
              id={chemicalCheckboxId + '2'}
              name="chemical2"
              onChange={this.onCheckChange}
            />
          </Field>
          <Field
            label={translate(keys.CHEMICAL) + '3'}
            htmlFor={chemicalCheckboxId + '3'}
          >
            <input
              type="checkbox"
              id={chemicalCheckboxId + '3'}
              name="chemical3"
              onChange={this.onCheckChange}
            />
          </Field>
          <Field
            label={translate(keys.CHEMICAL) + '4'}
            htmlFor={chemicalCheckboxId + '4'}
          >
            <input
              type="checkbox"
              id={chemicalCheckboxId + '4'}
              name="chemical4"
              onChange={this.onCheckChange}
            />
          </Field>
        </Form>
        <SprayingTable
          areWeedSectorsVisible={state.weed}
          chemicalSectorVisibility={[
            state.chemical1,
            state.chemical2,
            state.chemical3,
            state.chemical4,
          ]}
          sectionList={props.sectionList}
        />
      </div>
    )
  }
}

SprayingTableControl.propTypes = {sectionList: PropTypes.arrayOf(PropTypes.instanceOf(Section)).isRequired}
