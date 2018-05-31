import React from 'react'
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'
import makeBem from 'bem-cx'

import {constants} from 'utils/constants'
import {translate, keys} from 'utils/translate'

const cn = makeBem('Navbar')

const Links = () => (
  <div>
    <Link to={constants.paths.MAP_PAGE}>{translate(keys.MAP)}</Link>
    <Link to={constants.paths.TABLE_PAGE + '/1'}>{translate(keys.TABLE)}</Link>
  </div>
)

export const Navbar = props => (
  <div className={cn}>
    <h1>G&G</h1>
    {props.isUser && <Links/>}
    {props.isUser && <button onClick={props.logout}>{translate(keys.LOGOUT)}</button>}
  </div>
)

Navbar.propTypes = {
  isUser: PropTypes.bool.isRequired,
  logout: PropTypes.func.isRequired,
}
