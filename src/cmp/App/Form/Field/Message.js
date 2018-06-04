import React from 'react'
import PropTypes from 'prop-types'

export const Message = props => props.message === '' ? null : <div className="Message">{props.message}</div>

Message.propTypes = {
  message: PropTypes.shape({
    type: PropTypes.oneOf([
      'success',
      'warning',
      'error',
    ]),
    text: PropTypes.string.isRequired,
  }),
}
