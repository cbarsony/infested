import React from 'react'
import makeBem from 'bem-cx'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'

import {Spraying} from 'api/classes'
import {translate, keys} from 'utils/translate'
import {constants} from 'utils/constants'
import {Item} from 'cmp/App/Item'
import {Modal} from 'cmp/App/Modal'
import {Container} from 'cmp/App/Container'
import {Card} from 'cmp/App/Card'

import {SprayingSelect} from './SprayingSelect'
import {SprayingSummary} from './SprayingSummary'
import {SprayingDescription} from './SprayingDescription'

const cn = makeBem('Sidebar')

export const Sidebar = props => (
  <div className={cn}>
    {/*<Modal>
     <div style={{fontSize: '100px'}}>majom vagy</div>
     </Modal>*/}
    <Container>
      <SprayingSelect sprayingId={props.spraying && props.spraying.id}/>
      <Card>
        {props.spraying && <SprayingDescription description={props.spraying.description}/>}
      </Card>
      <Card>
        {props.spraying && <SprayingSummary summary={props.spraying.summary}/>}
        <hr/>
        {props.spraying && (
          <ul>
            <Item iconClass="fas fa-table">
              <Link
                className={cn.el('Link')}
                to={`${constants.paths.TABLE_PAGE}/${props.spraying.id}`}
              >{translate(keys.OPEN_DATA_TABLE)}</Link>
            </Item>
          </ul>
        )}
      </Card>
    </Container>
  </div>
)

Sidebar.propTypes = {
  spraying: PropTypes.instanceOf(Spraying),
}
