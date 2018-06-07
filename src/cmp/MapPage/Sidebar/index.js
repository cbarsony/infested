import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'

import {Spraying} from 'api/classes'
import {translate, keys} from 'utils/translate'
import {constants} from 'utils/constants'
import {Item} from 'cmp/App/Item'
import {Modal} from 'cmp/App/Modal'
import {Container} from 'cmp/App/Container'
import {Card} from 'cmp/App/Container/Card'
import {Hr} from 'cmp/App/Container/Card/Hr'

import {SprayingSelect} from './SprayingSelect'
import {SprayingSummary} from './SprayingSummary'
import {SprayingDescription} from './SprayingDescription'

export class Sidebar extends Component {
  state = {
    inModalVisible: false,
  }

  onModalClose = () => this.setState({inModalVisible: false})

  render() {
    const props = this.props
    const state = this.state

    return (
      <div className="Sidebar">
        {state.inModalVisible && (
          <Modal
            isVisible={state.inModalVisible}
            onClose={this.onModalClose}
          >
            <div style={{fontSize: '100px'}}>majom vagy</div>
          </Modal>
        )}
        <Container>
          <SprayingSelect sprayingId={props.spraying && props.spraying.id}/>
          {props.spraying && (
            <Card key="1">
              {props.spraying && <SprayingDescription description={props.spraying.description}/>}
            </Card>
          )}
          {props.spraying && (
            <Card key="2">
              {props.spraying && <SprayingSummary summary={props.spraying.summary}/>}
              <Hr/>
              <Item iconClass={'fas fa-list'}>
                <span>
                  <a
                    href=""
                    onClick={e => {
                      e.preventDefault()
                      this.setState({inModalVisible: true})
                    }}
                  >{translate(keys.SHOW_ALL_SECTORS)}</a>
                </span>
              </Item>
              <Item iconClass="fas fa-table">
                <span>
                  <Link to={`${constants.paths.TABLE_PAGE}/${props.spraying.id}`}>{translate(keys.OPEN_DATA_TABLE)}</Link>
                </span>
              </Item>
            </Card>
          )}
        </Container>
      </div>
    )
  }
}

Sidebar.propTypes = {
  spraying: PropTypes.instanceOf(Spraying),
}
