import React, {Component} from 'react'
import PropTypes from 'prop-types'
import makeBem from 'bem-cx'
import _ from 'lodash'

import {translate, keys} from 'utils/translate'
import {SprayingSummary as CSprayingSummary} from 'api/classes.js'
import {Field} from 'cmp/App/Form/Field'

const cn = makeBem('SprayingSummary')
const showAllSectorsCheckbox = cn.el('showAllSectorsCheckbox').toString()

export class SprayingSummary extends Component {
  state = {areSectorsVisible: false}

  onShowAllSectorsCheckboxChange = value => this.setState({areSectorsVisible: value})

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
      <div>
        <i className="fas fa-list"></i>
        <Field
          name={showAllSectorsCheckbox}
          type="checkbox"
          value={false}
          label={translate(keys.SHOW_ALL_SECTORS)}
          onChange={this.onShowAllSectorsCheckboxChange}
        />
      </div>
    )

    return (
      <div className={cn}>
        <table className={cn.el('Table')}>
          <thead>
          <tr>
            <th/>
            <th>Sum [l]</th>
            {sectorHeadings}
          </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <span className={cn.el('iconContainer')}>
                  <i className="fas fa-leaf"></i>
                </span>
                <span className={cn.el('sumName')}>
                  {translate(keys.WEED_INFESTATION)}
                </span>
              </td>
              <td>{props.summary.weedInfestationSummary.quantity}</td>
              {weedSectorCells}
            </tr>
            {props.summary.chemicalSummaries.map(chemicalSummary => (
              <tr key={chemicalSummary.chemicalId}>
                <td>
                  <span className={cn.el('iconContainer')}>
                    <i className="fas fa-flask"></i>
                  </span>
                  <span className={cn.el('sumName')}>
                    {translate(keys.CHEMICAL)} {chemicalSummary.chemicalId}
                  </span>
                </td>
                <td>{chemicalSummary.quantity}</td>
                {state.areSectorsVisible && chemicalSummary.sectorQuantities.map(getChemicalSectorCells)}
              </tr>
            ))}
          </tbody>
        </table>
        {showAllSectorsSwitch}
      </div>
    )
  }
}

SprayingSummary.propTypes = {summary: PropTypes.instanceOf(CSprayingSummary).isRequired}
