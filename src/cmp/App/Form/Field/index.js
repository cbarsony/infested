import React from 'react'
import PropTypes from 'prop-types'

import {Label} from './Label'
import {Input} from './Input'

export const Field = props => {
  const label = (
    <Label
      text={props.label}
      htmlFor={'Input__' + props.name}
    />
  )

  return (
    <div className="Field">
      {!/checkbox|radio/.test(props.type) && label}
      <Input
        type={props.type}
        name={props.name}
        value={props.value}
        onChange={e => props.onChange(props.type === 'checkbox' ? e.target.checked : e.target.value, props.name)}
      />
      {/checkbox|radio/.test(props.type) && label}
    </div>
  )

}

Field.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.oneOf([
    'text',
    'checkbox',
    'radio',
    'password',
    'number',
  ]).isRequired,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.bool,
  ]).isRequired,
  label: PropTypes.string,
  rules: PropTypes.arrayOf(PropTypes.oneOf(['required'])),
  onChange: PropTypes.func.isRequired,
}
