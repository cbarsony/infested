import React from 'react'
import makeBem from 'bem-cx'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'

import {Spraying} from 'api/classes'
import {translate, keys} from 'utils/translate'
import {constants} from 'utils/constants'

import {SprayingSelect} from './SprayingSelect'
import {SprayingSummary} from './SprayingSummary'
import {SprayingDescription} from './SprayingDescription'

const cn = makeBem('Sidebar')

export const Sidebar = props => (
  <div className={cn}>
    <SprayingSelect sprayingId={props.spraying && props.spraying.id}/>
    {props.spraying && <Link to={`${constants.paths.TABLE_PAGE}/${props.spraying.id}`}>{translate(keys.OPEN_DATA_TABLE)}</Link>}
    {props.spraying && <SprayingDescription description={props.spraying.description}/>}
    {props.spraying && <SprayingSummary summary={props.spraying.summary}/>}
  </div>
)

Sidebar.propTypes = {
  spraying: PropTypes.instanceOf(Spraying),
}
