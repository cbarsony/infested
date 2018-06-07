import React from 'react'
import PropTypes from 'prop-types'
import makeBem from 'bem-cx'

import {translate, keys} from 'utils/translate'
import {SprayingSummary as CSprayingSummary} from 'api/classes.js'
import {constants} from 'utils/constants'

const cn = makeBem('SprayingSummary')

export const SprayingSummary = props => (
  <div className={cn}>
    <table className={cn.el('Table')}>
      <thead>
      <tr>
        <th/>
        <th>Sum</th>
      </tr>
      </thead>
      <tbody>
      <tr>
        <td>
          <span className={cn.el('iconContainer')}>
            <i className="fas fa-leaf"></i>
          </span>
          <span className={cn.el('sumName')}>{translate(keys.WEED_INFESTATION)} [%]</span>
        </td>
        <td>{props.summary.weedInfestationSummary.quantity}</td>
      </tr>
      {props.summary.chemicalSummaries.map(chemicalSummary => (
        <tr key={chemicalSummary.chemicalId}>
          <td>
            <span className={cn.el('iconContainer')}>
              <i className="fas fa-flask"></i>
            </span>
            <span className={cn.el('sumName')}>{constants.chemicals[chemicalSummary.chemicalId - 1]} [l]</span>
          </td>
          <td>{chemicalSummary.quantity}</td>
        </tr>
      ))}
      </tbody>
    </table>
  </div>
)

SprayingSummary.propTypes = {summary: PropTypes.instanceOf(CSprayingSummary).isRequired}
