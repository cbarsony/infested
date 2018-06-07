import React from 'react'
import PropTypes from 'prop-types'

export const Container = props => <div className="Container">{props.children}</div>

Container.propTypes = {children: PropTypes.oneOfType([
  PropTypes.element,
  PropTypes.arrayOf(PropTypes.element),
])}
