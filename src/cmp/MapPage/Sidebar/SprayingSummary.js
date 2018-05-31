import React, {Component} from 'react'
import PropTypes from 'prop-types'
import makeBem from 'bem-cx'
import _ from 'lodash'

import {translate, keys} from 'utils/translate'
import {SprayingSummary as CSprayingSummary} from 'api/classes.js'
import {Field} from 'cmp/App/Form'

const cn = makeBem('SprayingSummary')
const showAllSectorsCheckbox = cn.el('showAllSectorsCheckbox').toString()

export class SprayingSummary extends Component {
  state = {areSectorsVisible: false}

  onShowAllSectorsCheckboxChange = e => this.setState({areSectorsVisible: e.target.checked})

  render() {
    const props = this.props
    const state = this.state

    let sectorHeadings
    let weedSectorCells

    if(state.areSectorsVisible) {
      sectorHeadings = _.range(1, 10).map(i => <th key={i}>{translate(keys.SECTOR)} {i}</th>)
      weedSectorCells = props.summary.weedInfestationSummary.sectorQuantities.map(sector => <td key={sector.sectorId}>{sector.quantity}</td>)
    }

    const getChemicalSectorCells = sector => <td key={sector.sectorId}>{sector.quantity}</td>

    const showAllSectorsSwitch = (
      <Field
        label={translate(keys.SHOW_ALL_SECTORS)}
        htmlFor={showAllSectorsCheckbox}
      >
        <input
          type="checkbox"
          id={showAllSectorsCheckbox}
          onChange={this.onShowAllSectorsCheckboxChange}
        />
      </Field>
    )

    return (
      <div>
        {showAllSectorsSwitch}
        <table className={cn}>
          <thead>
          <tr>
            <th/>
            <th>Sum</th>
            {sectorHeadings}
          </tr>
          </thead>
          <tbody>
            <tr>
              <td>{translate(keys.WEED_INFESTATION)}</td>
              <td>{props.summary.weedInfestationSummary.quantity}</td>
              {weedSectorCells}
            </tr>
            {props.summary.chemicalSummaries.map(chemicalSummary => (
              <tr key={chemicalSummary.chemicalId}>
                <td>{translate(keys.CHEMICAL)} {chemicalSummary.chemicalId}</td>
                <td>{chemicalSummary.quantity}</td>
                {state.areSectorsVisible && chemicalSummary.sectorQuantities.map(getChemicalSectorCells)}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  }
}

SprayingSummary.propTypes = {summary: PropTypes.instanceOf(CSprayingSummary).isRequired}
