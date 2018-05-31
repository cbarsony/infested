import React from 'react'
import PropTypes from 'prop-types'

export const Field = props => (
  <div className="Field">
    <label htmlFor={props.htmlFor}>
      {props.label}
    </label>
    {props.children}
  </div>
)

Field.propTypes = {
  label: PropTypes.string,
  htmlFor: PropTypes.string,
}
