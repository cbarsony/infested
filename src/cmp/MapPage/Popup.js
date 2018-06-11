import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import makeBem from 'bem-cx'

import {translate, keys} from 'utils/translate'
import {Section} from 'api/classes.js'

const cn = makeBem('Popup')
const portalRoot = document.getElementById('sectionDataPopup')

export class Popup extends Component {
  constructor(props) {
    super(props);
    this.el = document.createElement('div')
  }

  componentDidMount() {
    portalRoot.appendChild(this.el)
  }

  componentWillUnmount() {
    portalRoot.removeChild(this.el);
  }

  render() {
    const props = this.props

    return ReactDOM.createPortal(
      <div className={cn}>
        <div
          className={cn.el('close')}
          onClick={props.closePopup}
          style={{float: 'right'}}
        >
          <i className="fas fa-times"></i>
        </div>
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
      this.el,
    )
  }
}

Popup.propTypes = {
  section: PropTypes.instanceOf(Section).isRequired,
  closePopup: PropTypes.func.isRequired,
}
