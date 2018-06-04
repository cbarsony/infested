import React, {Component} from 'react'
import makeBem from 'bem-cx'

import {api} from 'api'
import {translate, keys} from 'utils/translate'

import {Sidebar} from './Sidebar'
import {Map} from './Map'

const cn = makeBem('MapPage')

export class MapPage extends Component {
  state = {
    spraying: null,
    isSprayingLoading: false,
  }

  onSelectSpraying = e => {
    this.setState({
      spraying: null,
      isSprayingLoading: true,
    })

    api.getSpraying(Number(e.target.value))
      .then(spraying => this.setState({
        isSprayingLoading: false,
        spraying,
      }))
      .catch(error => console.log(error))
  }

  render() {
    const state = this.state

    return (
      <div className={cn}>
        {state.isSprayingLoading && <div>{translate(keys.LOADING)}</div>}
        <Sidebar
          spraying={state.spraying}
          selectSpraying={this.onSelectSpraying}
        />
        {state.spraying && <Map spraying={state.spraying}/>}
      </div>
    )
  }
}
