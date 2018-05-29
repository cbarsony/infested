import React from 'react'
import makeBem from 'bem-cx'
import PropTypes from 'prop-types'

import {Section} from 'utils/api'

const cn = makeBem('MapPage')

export const Map = props => (
  <div className={cn.el('Map')}>m</div>
)

Map.propTypes = {
  sections: PropTypes.arrayOf(PropTypes.instanceOf(Section)),
}
