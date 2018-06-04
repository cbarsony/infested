import React from 'react'
import PropTypes from 'prop-types'
import makeBem from 'bem-cx'

import {SprayingDescription} from 'api/classes'

const cn = makeBem('Info')

export const Info = props => <div className={cn}>{props.description.databaseName}</div>

Info.propTypes = {description: PropTypes.instanceOf(SprayingDescription).isRequired}
