import React from 'react'
import PropTypes from 'prop-types'
import makeBem from 'bem-cx'

import {SprayingDescription} from 'api/classes'

const cn = makeBem('SprayingInfo')

export const SprayingInfo = props => <div className={cn}>{props.description.databaseName}</div>

SprayingInfo.propTypes = {description: PropTypes.instanceOf(SprayingDescription).isRequired}
