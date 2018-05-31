import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'

import {translate, keys} from 'utils/translate'
import {Section} from 'utils/api/classes.js'

export const Popup = props => ReactDOM.createPortal(
  <div
    style={{
      background: '#fff',
      padding: 5,
      boxShadow: '2px 2px 2px #aaa',
    }}
  >
    <button
      onClick={props.closePopup}
      style={{float: 'right'}}
    >
      <span>remove</span>
    </button>
    <div>{translate(keys.DISTANCE)}: {props.section.distance}m</div>
    <table>
      <thead>
      <tr>
        <th/>
        <th>{translate(keys.DOSE)} [l/ha]</th>
        <th>{translate(keys.QUANTITY)} [l]</th>
      </tr>
      </thead>
      <tbody>
      <tr>
        <td>Kyleo</td>
        <td>{props.section.chemicals[0].dosage}</td>
        <td>{props.section.chemicals[0].quantity}</td>
      </tr>
      <tr>
        <td>Panic Free</td>
        <td>{props.section.chemicals[1].dosage}</td>
        <td>{props.section.chemicals[1].quantity}</td>
      </tr>
      <tr>
        <td>Vival</td>
        <td>{props.section.chemicals[2].dosage}</td>
        <td>{props.section.chemicals[2].quantity}</td>
      </tr>
      <tr>
        <td>Genoxone</td>
        <td>{props.section.chemicals[3].dosage}</td>
        <td>{props.section.chemicals[3].quantity}</td>
      </tr>
      </tbody>
    </table>
  </div>,
  document.getElementById('sectionDataPopup'),
)

Popup.propTypes = {
  section: PropTypes.instanceOf(Section).isRequired,
  closePopup: PropTypes.func.isRequired,
}