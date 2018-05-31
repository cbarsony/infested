import React from 'react'
import PropTypes from 'prop-types'
import makeBem from 'bem-cx'

import {translate, keys} from 'utils/translate'

const cn = makeBem('BoolLabel')

export const BoolLabel = props => <span className={cn.modObj({1: props.value, 0: !props.value})}>{props.value ? translate(keys.YES) : translate(keys.NO)}</span>

BoolLabel.propTypes = {
  value: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.number,
  ]).isRequired,
}
