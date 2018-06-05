import React, {Component} from 'react'
import PropTypes from 'prop-types'
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

  componentDidMount() {
    const sprayingId = this.props.sprayingId

    if(sprayingId) {
      this.setState({
        spraying: null,
        isSprayingLoading: true,
      })

      api.getSpraying(sprayingId)
        .then(spraying => this.setState({
          isSprayingLoading: false,
          spraying,
        }))
        .catch(error => console.log(error))
    }
  }

  componentDidUpdate(prevProps) {
    if(prevProps && prevProps.sprayingId !== this.props.sprayingId) {
      this.setState({
        spraying: null,
        isSprayingLoading: true,
      })

      api.getSpraying(this.props.sprayingId)
        .then(spraying => this.setState({
          isSprayingLoading: false,
          spraying,
        }))
        .catch(error => console.log(error))
    }
  }

  render() {
    const props = this.props
    const state = this.state

    return (
      <div className={cn}>
        {state.isSprayingLoading && <div>{translate(keys.LOADING)}</div>}
        <Sidebar spraying={state.spraying}/>
        {state.spraying && (
          <Map
            spraying={state.spraying}
            sectionId={props.sectionId}
          />
        )}
      </div>
    )
  }
}

MapPage.propTypes = {
  sprayingId: PropTypes.number,
  sectionId: PropTypes.number,
}
