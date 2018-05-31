import React, {Component} from 'react'
import PropTypes from 'prop-types'
import makeBem from 'bem-cx'

import {api} from 'api'
import {translate, keys} from 'utils/translate'

import {SprayingTableControl} from './SprayingTableControl'
import {SprayingInfo} from './SprayingInfo'

const cn = makeBem('TablePage')

export class TablePage extends Component {
  state = {
    spraying: null,
    isSprayingLoading: true,
  }

  componentDidMount() {
    api.getSpraying(this.props.sprayingId)
      .then(spraying => this.setState({
        spraying,
        isSprayingLoading: false,
      }))
      .catch(error => console.warn(error))
  }

  render() {
    const state = this.state

    if(state.isSprayingLoading) return <div>{translate(keys.LOADING)}</div>

    return (
      <div className={cn}>
        <SprayingInfo description={state.spraying.description}/>
        <SprayingTableControl sectionList={state.spraying.sections}/>
      </div>
    )
  }
}

TablePage.propTypes = {sprayingId: PropTypes.number.isRequired}
