import React from 'react'
import PropTypes from 'prop-types'
import makeBem from 'bem-cx'

const cn = makeBem('Input')

export const Input = props => (
  <input
    id={'Input__' + props.name}
    className={cn}
    type={props.type}
    value={props.value}
    onChange={props.onChange}
  />
)

Input.propTypes = {
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
    PropTypes.bool,
  ]).isRequired,
  onChange: PropTypes.func.isRequired,
}
