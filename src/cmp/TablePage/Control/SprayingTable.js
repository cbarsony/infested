import React from 'react'
import PropTypes from 'prop-types'
import makeBem from 'bem-cx'

import {Section} from 'utils/api/classes'

const cn = makeBem('TablePage__Control__SprayingTable')

export const SprayingTable = props => (
  <div className={cn}>SprayingTable</div>
)

SprayingTable.propTypes = {
  areWeedSectorsVisible: PropTypes.bool.isRequired,
  chemicalSectorVisibility: PropTypes.arrayOf(PropTypes.bool).isRequired,
  sectionList: PropTypes.arrayOf(PropTypes.instanceOf(Section)).isRequired,
}