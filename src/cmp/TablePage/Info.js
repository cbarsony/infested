import React from 'react'
import PropTypes from 'prop-types'
import makeBem from 'bem-cx'

import {SprayingDescription} from 'api/classes'

const cn = makeBem('Info')

export const Info = props => (
  <div className={cn}>
    <i className="fas fa-info" style={{marginRight: 8}}></i>
    {props.description.databaseName}
  </div>
)

Info.propTypes = {description: PropTypes.instanceOf(SprayingDescription).isRequired}
