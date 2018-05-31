import React, {Component} from 'react'
import PropTypes from 'prop-types'
import makeBem from 'bem-cx'

import {Section} from 'utils/api/classes'

import {SprayingTable} from './SprayingTable'

const cn = makeBem('TablePage__Control')

export class Control extends Component {
  state = {
    areWeedSectorsVisible: false,
    chemicalSectorVisibility: [],
  }

  render() {
    const props = this.props
    const state = this.state

    return (
      <div className={cn}>
        <SprayingTable
          areWeedSectorsVisible={state.areWeedSectorsVisible}
          chemicalSectorVisibility={state.chemicalSectorVisibility}
          sectionList={props.sectionList}
        />
      </div>
    )
  }
}

Control.propTypes = {
  sectionList: PropTypes.arrayOf(PropTypes.instanceOf(Section)).isRequired,
}
