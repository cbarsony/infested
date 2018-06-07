import React from 'react'
import PropTypes from 'prop-types'

export const Item = props => (
  <li className="Item">
    {props.iconClass && (
      <span>
        <i className={props.iconClass}></i>
      </span>
    )}
    {props.text && <span>{props.text}</span>}
    {props.children}
  </li>
)

Item.propTypes = {
  iconClass: PropTypes.string,
  text: PropTypes.string,
}
