import React from 'react'
import PropTypes from 'prop-types'

export const Warning = props => props.message === '' ? null : <div className="Warning">{props.message}</div>

Warning.propTypes = {message: PropTypes.string.isRequired}
