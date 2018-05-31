import React, {Component} from 'react'
import PropTypes from 'prop-types'
import makeBem from 'bem-cx'

import {translate, keys} from 'utils/translate'
import {api} from 'api'

const cn = makeBem('SprayingSelect')

export class SprayingSelect extends Component {
  state = {
    shortSprayingDescriptionList: [],
    isShortSprayingDescriptionListLoading: true,
  }

  componentDidMount() {
    api.getShortSprayingDescriptionList()
      .then(shortSprayingDescriptionList => this.setState({
        shortSprayingDescriptionList,
        isShortSprayingDescriptionListLoading: false,
      }))
  }

  render() {
    const props = this.props
    const state = this.state

    if(state.isShortSprayingDescriptionListLoading) return <div>{translate(keys.LOADING)}</div>

    const options = state.shortSprayingDescriptionList.map((description, index) => (
      <option
        key={index}
        value={description.id}
      >
        {description.description}
      </option>
    ))

    options.unshift(<option key={-1} value="">{translate(keys.CHOOSE_ONE)}</option>)

    return (
      <select
        className={cn}
        value={props.sprayingId ? props.sprayingId : ''}
        onChange={props.selectSpraying}
      >
        {options}
      </select>
    )
  }
}

SprayingSelect.propTypes = {
  sprayingId: PropTypes.number,
  selectSpraying: PropTypes.func.isRequired,
}
