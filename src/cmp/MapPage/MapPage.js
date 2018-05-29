import React, {Component} from 'react'
import makeBem from 'bem-cx'

import {api} from 'utils/api'
import {translate, keys} from 'utils/translate'

import {Sidebar} from './Sidebar'
import {Map} from './Map'

const cn = makeBem('MapPage')

export class MapPage extends Component {
  state = {
    sprayingDescriptionList: [],
    isSprayingDescriptionListLoading: true,
    spraying: null,
    isSprayingLoading: false,
  }

  componentDidMount() {
    api.getSprayingList()
      .then(sprayingDescriptionList => this.setState({
        sprayingDescriptionList,
        isSprayingDescriptionListLoading: false,
      }))
  }

  onSelectSpraying = e => {
    this.setState({isSprayingLoading: true})

    api.getSpraying(Number(e.target.value))
      .then(spraying => this.setState({
        isSprayingLoading: false,
        spraying,
      }))
      .catch(error => {
        console.log(error)
      })
  }

  render() {
    const state = this.state

    if(state.isSprayingLoading) return <div>{translate(keys.LOADING)}</div>

    return (
      <div className={cn}>
        <Sidebar
          sprayingDescriptionList={state.sprayingDescriptionList}
          isSprayingDescriptionListLoading={state.isSprayingDescriptionListLoading}
          spraying={state.spraying}
          selectSpraying={this.onSelectSpraying}
        />
        <Map/>
      </div>
    )
  }
}
