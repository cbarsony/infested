import React from 'react'
import PropTypes from 'prop-types'

export const Label = props => (
  <label
    className="Label"
    htmlFor={props.htmlFor}
  >{props.text}</label>
)

Label.propTypes = {text: PropTypes.string.isRequired}
