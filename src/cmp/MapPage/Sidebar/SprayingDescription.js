import React from 'react'
import PropTypes from 'prop-types'
import makeBem from 'bem-cx'

import {SprayingDescription as CSprayingDescription} from 'api/classes.js'

const cn = makeBem('SprayingDescription')

export const SprayingDescription = props => (
  <ul className={cn}>
    <li>{props.description.requestType}</li>
    <li>{props.description.databaseName}</li>
    <li>{props.description.sectionSprayed}</li>
    <li>{props.description.timeSprayed.toString()}</li>
    <li>{props.description.distanceSprayed}</li>
  </ul>
)

SprayingDescription.propTypes = {description: PropTypes.instanceOf(CSprayingDescription)}
