import React from 'react'
import PropTypes from 'prop-types'
import {SprayingSummary} from 'api/classes'
import _ from 'lodash'

import {constants} from 'utils/constants'
import {translate, keys} from 'utils/translate'

export const Details = props => (
  <table className="Details">
    <thead>
      <tr>
        <th/>
        <th>Sum</th>
        {_.range(9).map(i => (
          <th key={i}>{translate(keys.SECTOR)} {i + 1}</th>
        ))}
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>
          <span>
            <i className="fas fa-leaf"></i>
          </span>
          {translate(keys.WEED_INFESTATION)} [%]
        </td>
        <td>{props.summary.weedInfestationSummary.quantity}</td>
        {props.summary.weedInfestationSummary.sectorQuantities.map((sector, index) => <td key={index}>{sector.quantity}</td>)}
      </tr>
      {props.summary.chemicalSummaries.map((chemical, index) => (
        <tr key={index}>
          <td>
            <span>
              <i className="fas fa-flask"></i>
            </span>
            {constants.chemicals[chemical.chemicalId - 1]} [l]
          </td>
          <td>{chemical.quantity}</td>
          {chemical.sectorQuantities.map((sector, index) => <td key={index}>{sector.quantity}</td>)}
        </tr>
      ))}
    </tbody>
  </table>
)

Details.propTypes = {summary: PropTypes.instanceOf(SprayingSummary).isRequired}
