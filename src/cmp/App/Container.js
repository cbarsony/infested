import React from 'react'
import PropTypes from 'prop-types'

export const Container = props => <div className="Container">{props.children}</div>

Container.propTypes = {children: PropTypes.arrayOf(PropTypes.element)}
