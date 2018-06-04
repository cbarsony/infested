import React, {Component} from 'react'
import PropTypes from 'prop-types'
import update from 'immutability-helper'

import {Field} from './Field'

const setFields = fields => {
  const result = {}

  fields.forEach(field => {
    result[field.name] = {
      value: field.value,
    }
  })

  return result
}

export class Form extends Component {
  state = {fields: setFields(this.props.fields)}

  render() {
    const props = this.props
    const state = this.state

    return (
      <form>
        {props.fields.map((field, index) => (
          <Field
            key={index}
            name={field.name}
            type={field.type}
            label={field.label}
            value={state.fields[field.name].value}
            onChange={(value, name) => this.setState(state => update(state, {
              fields: {
                [name]: {
                  value: {
                    $set: value,
                  },
                },
              },
            }))}
          />
        ))}
        <button
          type="submit"
          onClick={e => {
            e.preventDefault()
            props.onSubmit(state.fields)
          }}
        >{props.submitText}</button>
      </form>
    )
  }
}

Form.propTypes = {
  fields: PropTypes.arrayOf(PropTypes.shape(Field.propTypes)).isRequired,
  submitText: PropTypes.string.isRequired,
  onSubmit: PropTypes.func,
}

Form.defaultProps = {
  submitText: 'submit',
}
