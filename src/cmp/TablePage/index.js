import React, {Component} from 'react'
import PropTypes from 'prop-types'
import makeBem from 'bem-cx'

import {api} from 'api'
import {translate, keys} from 'utils/translate'
import {Container} from 'cmp/App/Container'
import {Card} from 'cmp/App/Container/Card'

import './TablePage.css'
import {Control} from './Control'
import {Info} from './Info'
import {SprayingTable} from './SprayingTable'

const cn = makeBem('TablePage')

export class TablePage extends Component {
  state = {
    spraying: null,
    isSprayingLoading: true,
    areWeedSectorsVisible: false,
    chemicalSectorsVisibility: [
      false,
      false,
      false,
      false,
    ],
  }

  componentDidMount() {
    api.getSpraying(this.props.sprayingId)
      .then(spraying => this.setState({
        spraying,
        isSprayingLoading: false,
      }))
      .catch(error => console.warn(error))
  }

  setWeedSectorsVisibility = areWeedSectorsVisible => this.setState({areWeedSectorsVisible})

  setChemicalSectorsVisibility = chemicalSectorsVisibility => this.setState({chemicalSectorsVisibility})

  render() {
    const state = this.state

    if(state.isSprayingLoading) return <div>{translate(keys.LOADING)}</div>

    return (
      <div className={cn}>
        <Container>
          <Card>
            <Info description={state.spraying.description}/>
            <Control
              areWeedSectorsVisible={state.areWeedSectorsVisible}
              chemicalSectorsVisibility={state.chemicalSectorsVisibility}
              setWeedSectorsVisibility={this.setWeedSectorsVisibility}
              setChemicalSectorsVisibility={this.setChemicalSectorsVisibility}
            />
          </Card>
          <Card>
            <SprayingTable
              spraying={state.spraying}
              areWeedSectorsVisible={state.areWeedSectorsVisible}
              chemicalSectorsVisibility={state.chemicalSectorsVisibility}
            />
          </Card>
        </Container>
      </div>
    )
  }
}

TablePage.propTypes = {sprayingId: PropTypes.number.isRequired}
