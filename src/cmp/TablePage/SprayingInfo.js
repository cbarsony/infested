import React from 'react'
import PropTypes from 'prop-types'
import makeBem from 'bem-cx'

import {SprayingDescription, SprayingSummary} from 'utils/api/classes'

const cn = makeBem('TablePage__SprayingInfo')

export const SprayingInfo = props => (
  <div className={cn}>SprayingInfo</div>
)

SprayingInfo.propTypes = {
  description: PropTypes.instanceOf(SprayingDescription).isRequired,
  summary: PropTypes.instanceOf(SprayingSummary).isRequired,
}