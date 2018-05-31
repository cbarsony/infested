import React from 'react'
import makeBem from 'bem-cx'
import PropTypes from 'prop-types'

import {Spraying} from 'utils/api/index'

import {SprayingSelect} from './SprayingSelect'
import {SprayingSummary} from './SprayingSummary'
import {SprayingDescription} from './SprayingDescription'

const cn = makeBem('MapPage__Sidebar')

export const Sidebar = props => (
  <div className={cn}>
    <SprayingSelect
      sprayingId={props.spraying && props.spraying.id}
      selectSpraying={props.selectSpraying}
    />
    {props.spraying && <SprayingDescription description={props.spraying.description}/>}
    {props.spraying && <SprayingSummary summary={props.spraying.summary}/>}
  </div>
)

Sidebar.propTypes = {
  spraying: PropTypes.instanceOf(Spraying),
  selectSpraying: PropTypes.func.isRequired,
}
