import React from 'react'
import PropTypes from 'prop-types'

export const Card = props => <div className="Card">{props.children}</div>

Card.propTypes = {children: PropTypes.arrayOf(PropTypes.element)}
