import React from 'react'
import PropTypes from 'prop-types'
import makeBem from 'bem-cx'

import {SprayingDescription as CSprayingDescription} from 'api/classes.js'
import {Item} from 'cmp/App/Item'

const cn = makeBem('SprayingDescription')

export const SprayingDescription = props => (
  <ul className={cn}>
    <Item
      text={props.description.requestType}
      iconClass="fas fa-info"
    />
    <Item
      text={props.description.sectionSprayed}
      iconClass="far fa-map"
    />
    <Item
      text={props.description.timeSprayed.toString()}
      iconClass="far fa-clock"
    />
    <Item
      text={props.description.distanceSprayed}
      iconClass="fas fa-road"
    />
  </ul>
)

SprayingDescription.propTypes = {description: PropTypes.instanceOf(CSprayingDescription)}
