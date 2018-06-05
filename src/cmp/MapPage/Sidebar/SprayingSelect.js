import React, {Component} from 'react'
import {withRouter} from 'react-router-dom'
import PropTypes from 'prop-types'
import makeBem from 'bem-cx'

import {translate, keys} from 'utils/translate'
import {constants} from 'utils/constants'
import {api} from 'api'

const cn = makeBem('SprayingSelect')

class SprayingSelectComponent extends Component {
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

  onSelectSpraying = e => this.props.history.push(`${constants.paths.MAP_PAGE}/${Number(e.target.value)}`)

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
        onChange={this.onSelectSpraying}
      >
        {options}
      </select>
    )
  }
}

SprayingSelectComponent.propTypes = {
  sprayingId: PropTypes.number,
  history: PropTypes.object.isRequired,
}

export const SprayingSelect = withRouter(SprayingSelectComponent)
